const validUrl = require('valid-url');
const shortid = require('shortid');
const validators = require('../validators/validator');
const urlModel = require('../models/urlModel');

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

        const urlCode = shortid.generate().toLowerCase()

        //let checkUrl = await urlModel.findOne({ longUrl: data.longUrl })

        // if (checkUrl) {
        //     return res.status(400).send({ status: false, message: "This URL has already been used, try another one" })

        // }
        let shortUrl = `http://localhost:3000/${urlCode}`

        data.urlCode = urlCode
        data.shortUrl = shortUrl

        let newUrl = await urlModel.create(data)
        return res.status(201).send({ status: true, data: newUrl })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
}

module.exports.createShortUrl = createShortUrl