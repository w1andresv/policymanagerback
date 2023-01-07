const Client = require('../modelos/cliente.js')
var service = {};

service.add = async (client) => {
  try {
    return await client.save()
  } catch (error) {
    throw Error(error)

  }
};
service.create = async (client) => {
  try {
    return await client.save()
  } catch (error) {
    throw Error(error)

  }
};
service.getAll = async (query, limit, page) => {
  try {
    return await Client.find(query);
  } catch (e) {
    throw Error(e)
  }
};
service.getById = async (id) => {
  try {
    return await Client.findById(id);
  } catch (e) {
    throw Error(e)
  }
};
service.getOne = async (query) => {
  try {
    return await Client.findOne(query);
  } catch (e) {
    throw Error(e)
  }
};
module.exports = service;
