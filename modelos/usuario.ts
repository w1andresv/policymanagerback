const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: {type: String, required: [true, 'Nombre requerido']},
    email: {type: String},
    usuarioSistema: {type: String, unique: true, required: [true, 'El usuario es necesario']},
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuarios'},
    celular: {type: String},
    habilitado: {type: Boolean},
    password: {type: String, required: [true, 'La contraseña es necesaria']},
    rol: {type: String, required: true, default: 'USER'}
}, {collection: 'usuarios'});
usuarioSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});
module.exports = mongoose.model('Usuario', usuarioSchema);
