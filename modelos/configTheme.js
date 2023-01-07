const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const themeSchema = new Schema({
    theme: {type: String},
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuarios'},
}, {collection: 'themes'});
module.exports = mongoose.model('Theme', themeSchema);
