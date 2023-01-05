const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
    name: {type: String, required: [true, 'lame required']},
    lastname: {type: String, required: [true, 'lastname required']},
    email: {type: String},
    identificationType: {type: String, required: [true, 'identification type required']},
    identification: {type: String, unique: true, required: [true, 'identification required']},
    creationUser: {type: Schema.Types.ObjectId, ref: 'Usuarios'},
    phone: {type: String},
    creationDate: {type: Date},
    updateDate: {type: Date},
    enabled: {type: Boolean},
}, {collection: 'clientes'});
clienteSchema.plugin(uniqueValidator, {message: '{PATH} should be unique'});
module.exports = mongoose.model('Cliente', clienteSchema);
