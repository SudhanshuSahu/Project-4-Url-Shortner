const mongoose = require('mongoose')


const isValidField = function(value) {
    if (typeof value === 'undefined' || value === null) return false;

    if (typeof value === 'string' && value.trim().length === 0) return false;

    return true;
};

const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0;
};

const isValidURL = function(link) {
    return (/^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?$/.test(link));
}



const isValidObjectId = function(ObjectId) {
    if (!mongoose.Types.ObjectId.isValid(ObjectId)) return false

    return true;
};



module.exports = {
    isValidField,
    isValidRequestBody,
    isValidObjectId,
    isValidURL
};