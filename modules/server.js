const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
require('dotenv').config({ path: '.env' });
const connection = require('../conexion')

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    // path services
    this.usuariosPath = '/usuarios';
    this.authPath = '/auth';
    this.uploadPath = '/uploadfile';
    this.themePath = '/theme';
    // Middlewares
    this.middlewares();
    // Rutas de mi aplicación
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    // Lectura y parseo del body
    this.app.use(express.json());
    // file upload
    this.app.use(fileUpload());
    // body parser
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

    // // Directorio Público
    // this.app.use(express.static('public'));

  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth.router'));
    this.app.use(this.usuariosPath, require('../routes/usuarios.router'));
    this.app.use(this.themePath, require('../routes/theme.router'));
    this.app.use(this.uploadPath, require('../routes/upload.router'));
  }

  listen() {
    this.app.listen(this.port, () => {
      connection();
      console.log(`Server running on port: ${this.port}`);
    });
  }

}




module.exports = Server;
