const userRepository = require('../../db/repositories').userRepository;
const uuid = require('../../helpers/commonUtils');
const bcrypt = require('bcrypt');

exports.listUsers = async(req, res) => {
    try {       
        await userRepository.getAllUsers(req, res);
        if (!res.sqlError) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

exports.addUser = async(req, res) => {
    try {
        req.body.id= await uuid.generateUUID();          
        const salt = bcrypt.genSaltSync();
        req.body.password = bcrypt.hashSync(req.body.password, salt)
        await userRepository.addUser(req, res);
        if (!res.sqlError) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

exports.getUser = async(req, res) => {
    try {
        await userRepository.getUser(req, res);
        if (!res.sqlError) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};