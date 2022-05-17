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
    return (/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(link));
}

const isValidMobileNo = function(mobile) {
    return (/((\+91)?0?)?[1-9]\d{9}/.test(mobile));
};

const isValidEmail = function(email) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
};

const isValidObjectId = function(ObjectId) {
    if (!mongoose.Types.ObjectId.isValid(ObjectId)) return false

    return true;
};

const isValidISBN = function(ISBN) {
    return (/^(?:ISBN(?:-13)?:?\ )?(?=[0-9]{13}$|(?=(?:[0-9]+[-\ ]){4})[-\ 0-9]{17}$)97[89][-\ ]?[0-9]{1,5}[-\ ]?[0-9]+[-\ ]?[0-9]+[-\ ]?[0-9]$/.test(ISBN));
}
const isValidReviewerName = function(value) {
    if (typeof value === 'number') return false
    return true
}
const isValidRating = function isInteger(value) {
    return value % 1 == 0;
}

const isValidNumber = function(value) {
    if (typeof value === 'undefined' || value === null) return false;

    if (typeof value === 'number' && value.length === 0) return false;

    return true;
};

module.exports = {
    isValidField,
    isValidRequestBody,
    isValidEmail,
    isValidMobileNo,
    isValidURL,
    isValidObjectId,
    isValidISBN,
    isValidReviewerName,
    isValidRating,
    isValidNumber
};