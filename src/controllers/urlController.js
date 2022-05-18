const shortid = require('shortid');
const validUrl = require('valid-url')
const validators = require('../validators/validator');
const urlModel = require('../models/urlModel');
const redis = require("redis");
const { promisify } = require("util");
const { findOne } = require('../models/urlModel');

//Connect to redis
const redisClient = redis.createClient(
    13598,
    "redis-13598.c264.ap-south-1-1.ec2.cloud.redislabs.com",
    { no_ready_check: true }
  );
  redisClient.auth("eB9Kuc7GO1mN1wHoM6NnfP23CFQjbGqp", function (err) {
    if (err) throw err;
  });
  
  redisClient.on("connect", async function () {
    console.log("Connected to Redis..");
  });


//Connection setup for redis

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

const createShortUrl = async function(req, res) {

    try {

        let data = req.body

        if (!validators.isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Please Provide data" });
        }

        if (!validators.isValidField(data.longUrl)) {
            return res.status(400).send({ status: false, message: "Provide Long Url" });
        }

        if (!validators.isValidURL(data.longUrl)) {
            return res.status(400).send({ status: false, message: "Proivde Valid Url" });
        }
        //
        let isDataPresent = await GET_ASYNC(`${data.longUrl}`)
        
            let response = JSON.parse(isDataPresent)
            if(response){
            console.log("data is from cache")
            return res.status(200).send({status: true, data: response})
        }

      else{
        const urlCode = shortid.generate().toLowerCase()

        // let checkUrl = await urlModel.findOne({ longUrl: data.longUrl })

        // if (checkUrl) {
        //     return res.status(400).send({ status: false, message: "This URL has already been used, try another one" })

        // }
        let shortUrl = `http://localhost:3000/${urlCode}`

        data.urlCode = urlCode
        data.shortUrl = shortUrl

        await urlModel.create(data)
        let findUrl = await urlModel.findOne({longUrl:data.longUrl}).select({_id:0 , createdAt:0 ,updatedAt:0 , __v:0})
        await SET_ASYNC(`${data.longUrl}`, JSON.stringify(findUrl)) 
        console.log("Data is stored in cache from db")
        return res.status(201).send({ status: true, data: findUrl })
    }
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
}


//******************************************Get API**************************************************//

const redirectUrl = async function(req,res){
    let urlCode = req.params.urlCode
    
//   if(urlCode.trimLeft()==null){
//          return res.status(400).send({status: false, msg: "Url Code not Valid"})
//    }

    const url = await urlModel.findOne({urlCode: urlCode})
    if (url) {
       
        return res.status(302).redirect(url.longUrl)
    } else {
        
        return res.status(404).send({status:false,msg:'No URL Found'})
    }

    
}

module.exports.createShortUrl = createShortUrl
module.exports.redirectUrl = redirectUrl