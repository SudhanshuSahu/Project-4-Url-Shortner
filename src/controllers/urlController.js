const validUrl = require('valid-url');
const shortid = require('shortid');
const Url = require('../models/urlModel');
const validators = require('../validators/validator');

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

        let checkUrl = await urlModel.findOne({ longUrl: data.longUrl })

        if (checkUrl) {
            return res.status(400).send({ status: false, message: "This URL has already been used, try another one" })
        }



    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
}

model.exports.createShortUrl = createShortUrl