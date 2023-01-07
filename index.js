const express = require('express');
const cors = require('cors')({ origin: true });
const bodyParser = require('body-parser');
const app = express();
const fileUpload = require('express-fileupload');
const connection = require('./conexion')
// Aplications routes
const userRoutes = require('./routes/usuario.router');
const authRoutes = require('./routes/auth.router');
const themeRoutes = require('./routes/theme.router');
const uploadRoutes = require('./routes/adjunto.router');
const clientRoutes = require('./routes/cliente.router');

require('dotenv').config({ path: '.env' });

app.use(cors);
app.use(fileUpload());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use('/auth', authRoutes);
app.use('/theme', themeRoutes);
app.use('/uploadfile', uploadRoutes);
app.use('/users', userRoutes);
app.use('/clients', clientRoutes);
app.get('/',  (req, res) => {
   res.status(200).send('Policy manager');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  connection();
  console.log(`Server running on port: ${port}`);
});



