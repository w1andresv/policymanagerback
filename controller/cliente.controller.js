const ClientService = require('../services/cliente.service');
const Client = require('../modelos/cliete');
const jwt = require('jsonwebtoken');
const controller = {};

controller.add = async (req, res, next) => {
  var loggeduser = jwt.decode(req.headers.authorization);
  const body = req.body;
  const client = new Client({
    name: body.name,
    lastname: body.lastname,
    email: body.email,
    identificationType: body.identificationType,
    identification: body.identification,
    creationUser: loggeduser.user._id,
    phone: body.phone,
    creationDate: new Date(),
    updateDate: new Date(),
    enabled: body.enabled
  });
  try {
    const data = await ClientService.add(client);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json(e.message);
  }
};
controller.update = async (req, res, next) => {
  const id = req.body._id;
  const body = req.body;
  const client = await ClientService.getById(id);
  if (client) {
    client.name = body.name;
    client.lastname = body.lastname;
    client.email = body.email;
    client.identificationType = body.identificationType;
    client.identification = body.identification;
    client.phone = body.phone;
    client.updateDate = new Date();
    client.enabled = body.enabled;
    try {
      const data = await ClientService.create(client);
      return res.status(200).json(data);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  } else {
    return res.status(400).json(e.message);
  }
};
controller.getAll = async (req, res, next) => {
  try {
    const data = await ClientService.getAll();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json(e.message);
  }
};
controller.getById = async (req, res, next) => {
  try {
    const data = await ClientService.getById(req.params.id);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json(e.message);
  }
};
controller.getByIdentificationAndType = async (req, res, next) => {
  const query = { 
    identificationType: req.params.identificationType, 
    identification: req.params.identification
   };
  try {
    const data = await ClientService.getOne(query);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json(e.message);
  }
};

module.exports = controller;
