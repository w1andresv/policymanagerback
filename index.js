const express = require('express');
const cors = require('cors')({origin: true});
const bodyParser = require('body-parser');
const app = express();
var fileUpload = require('express-fileupload');
const connection = require('./conexion')
// const usuarioRoutes = require('./routes/usuario.router');
const authRoutes = require('./routes/auth.router');
const themeRoutes = require('./routes/theme.router');
const uploadRoutes = require('./routes/adjunto.router');
const featureFlagRoutes = require('./routes/featureFlag.router');

require('dotenv').config({path: '.env'});

app.use(cors);
app.use(fileUpload());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use('/auth', authRoutes);
app.use('/theme', themeRoutes);
app.use('/uploadfile', uploadRoutes);
app.use('/featureFlag', featureFlagRoutes);
app.get('/', async (req, res) => {
    return res.status(200).send('Policy manager');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    connection();
    console.log(`Server running on port: ${port}`);
});



