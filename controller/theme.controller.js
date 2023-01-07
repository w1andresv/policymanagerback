const ThemeService = require('../services/theme.service');
const Theme = require('../modelos/configTheme');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const controller = {};

controller.add = async (req, res, next) => {
  var usuarioLogeqdo = jwt.decode(req.headers.authorization);
  const theme = new Theme({
    theme: req.body.theme,
    usuario: usuarioLogeqdo.user._id,
  });
  try {
    const data = await ThemeService.add(theme);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json(e.message);
  }
};
controller.update = async (req, res, next) => {
  var usuarioLogeqdo = jwt.decode(req.headers.authorization);
  const body = req.body;
  const value = await ThemeService.getByUser(usuarioLogeqdo.user._id);
  if (value) {
    value.theme = body.theme;
    value.usuario = usuarioLogeqdo.user._id;
    try {
      const data = await ThemeService.create(value);
      return res.status(200).json(data);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  } else {
    return res.status(400).json(null);
  }
};

controller.getByUser = async (req, res, next) => {
  var usuarioLogeqdo = jwt.decode(req.headers.authorization);
  try {
    const data = await ThemeService.getByUser(usuarioLogeqdo.user._id);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json(e.message);
  }
};

module.exports = controller;
