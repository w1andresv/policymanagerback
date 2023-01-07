const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    name: {type: String, required: [true, 'name required']},
    email: {type: String},
    username: {type: String, unique: true, required: [true, 'username required']},
    creationUser: {type: Schema.Types.ObjectId, ref: 'Usuarios'},
    phone: {type: String},
    enabled: {type: Boolean},
    creationDate: {type: Date},
    updateDate: {type: Date},
    password: {type: String, required: [true, 'password required']},
    rol: {type: String, required: true, default: 'USER'}
}, {collection: 'usuarios'});
usuarioSchema.plugin(uniqueValidator, {message: '{PATH} should be unique'});
module.exports = mongoose.model('Usuario', usuarioSchema);
