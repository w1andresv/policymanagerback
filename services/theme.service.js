const Theme = require('../modelos/configTheme.js')
var service = {};

service.add = async (theme) => {
    try {
        return await theme.save()
    } catch (error) {
        throw Error(error)

    }
};
service.create = async (theme) => {
    try {
        return await theme.save()
    } catch (error) {
        throw Error(error)

    }
};
service.getAll = async (query, limit, page) => {
    try {
        return await Theme.find(query);
    } catch (e) {
        throw Error(e)
    }
};
service.getById = async (id) => {
    try {
        return await Theme.findById(id);
    } catch (e) {
        throw Error(e)
    }
};
service.getByUser = async (usuario) => {
  var query={usuario:usuario};
    try {
        return await Theme.findOne(query);
    } catch (e) {
        throw Error(e)
    }
};
service.getOne = async (query) => {
    return await Theme.findOne(query);
};
module.exports = service;
