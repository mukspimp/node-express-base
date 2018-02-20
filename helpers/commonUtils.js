const uuidv1 = require('uuid/v1');

exports.generateUUID = async() => {
    return uuidv1();
};
