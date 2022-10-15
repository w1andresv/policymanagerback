const mongoose = require('mongoose');
const config = require('./config/config');

require('dotenv').config({ path: '.env' });

const InitiateMongoServer = async() => {
    try {
        await mongoose.connect(config.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        mongoose.Promise = global.Promise;
        console.log("Connected to DB !!");
    } catch (e) {
        console.log("Error connected to DB !!");
        console.log(e);
        throw e;
    }
};

module.exports = InitiateMongoServer;