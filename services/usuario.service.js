const User = require('../modelos/usuario.js')
var service = {};

service.add = async (user) => {
    try {
        return await user.save()
    } catch (error) {
        throw Error(error)

    }
};
service.create = async (user) => {
    try {
        return await user.save()
    } catch (error) {
        throw Error(error)

    }
};
service.getAll = async (query, limit, page) => {
    try {
        return await User.find(query);
    } catch (e) {
        throw Error(e)
    }
};
service.getById = async (id) => {
    try {
        return await User.findById(id);
    } catch (e) {
        throw Error(e)
    }
};
service.getByUsername = async (data) => {
    try {
        return await User.findOne({username:data});
    } catch (e) {
        throw Error(e)
    }
};
service.getByEmail = async (email) => {
    try {
        return await User.findOne({email:email});
    } catch (e) {
        throw Error(e)
    }
};
service.getOne = async (query) => {
    return await User.findOne(query);
};
module.exports = service;
