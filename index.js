const express = require('express');
const cors = require('cors')({origin: true});
const bodyParser = require('body-parser');
const app = express();

const connection = require('./conexion.ts')
const usuarioRoutes = require('./routes/usuario.router.ts');
const authRoutes = require('./routes/auth.router.ts');

require('dotenv').config({path: '.env'});

app.use(cors);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use('/login', authRoutes);
app.get('/', async (req, res) => {
    return res.status(200).send('Policy manager');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    connection();
    console.log(`Server running on port: ${port}`);
});



