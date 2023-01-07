var controller = {};

var fs = require('file-system');

const { google } = require('googleapis');
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = require("../config/config");
const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
});

controller.upload = async (req, res, next) => {
    controller.uploadFile(req).then(s => {
        return res.status(200).json({ estado: true, data: s });
    }).catch(e => {
        return res.status(500).json({ estado: false, mensaje: e });
    });
};

// Ejemplo carga archivos  (demo)
controller.uploadFile = async (req) => {
    return new Promise((resolve, reject) => {
        var fs = require('fs');
        var fileNameCustom = req.body.nombre;
        var idFolder = req.body.idFolder;
        // Obtener nombre del archivo
        var archivo = req.files.archivo;
        var nombreCortado = archivo.name.split('.');
        var extensionArchivo = nombreCortado[nombreCortado.length - 1];
        // Nombre de archivo personalizado
        var nombreArchivo = `${fileNameCustom}.${extensionArchivo}`;
        var nombreArchivoTemp = `temporal.${extensionArchivo}`;
        // Mover el archivo del temporal a un path
        var ruta = 'uploadsTemp/cliente';
        var path = `./${ruta}/${nombreArchivoTemp}`;
        try {
            fs.mkdir(`./${ruta}/`, (e) => {
                if (e && e.code !== 'EEXIST') {
                    reject('Error creando folder');
                }
                archivo.mv(path, async (err) => {
                    if (err) {
                        reject('Error al mover archivo');
                    }
                    // subir al drive
                    var fileMetadata = {
                        name: nombreArchivo,
                        parents: [idFolder]
                    };
                    var media = {
                        mimeType: archivo.mimeType,
                        body: fs.createReadStream(path)
                    };
                    var response = await drive.files.create({
                        resource: fileMetadata,
                        media: media,
                    });
                    resolve(response.data.id);
                });
            });
        } catch (error) {
            reject(error);
        }
    });
};
controller.uploadClientFiles = async (req, res, next) => {
    controller.subirArchivoCliente(req).then(s => {
        return res.status(200).json({ estado: true, data: s });
    }).catch(e => {
        return res.status(500).json({ estado: false, mensaje: e });
    });
};
controller.createFolder = async (req, res, next) => {
    controller.crearFolderDrive(req).then(s => {
        return res.status(200).json({ estado: true, data: s });
    }).catch(e => {
        return res.status(500).json({ estado: false, mensaje: e });
    });
};
controller.crearFolderDrive = async (req) => {
    return new Promise( async(resolve, reject) => {
        try {
            var folderName = req.body.nombre;
            var fileMetadataFolder = {
                name: folderName,
                mimeType: 'application/vnd.google-apps.folder'
            };
            const folder = await drive.files.create({
                resource: fileMetadataFolder,
                fields: 'id'
            });
            if (!folder) { reject('No fue posible crear folder en drive'); }
            resolve(folder.data.id);
        } catch (error) {
            reject(error);
        }
    });
};
controller.crearLinkDrive = async (req) => {
    return new Promise( async(resolve, reject) => {
        try {
            var fileId = req.params.fileId;
            await drive.permissions.create({
                fileId: fileId,
                requestBody:{
                    role: 'reader',
                    type: 'anyone'
                }
            });
            const response = await drive.files.get({
                fileId: fileId,
                fields: 'webViewLink, webContentLink'
            });
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
};
controller.generateLink = async (req, res, next) => {
    controller.crearLinkDrive(req).then(s => {
        return res.status(200).json({ estado: true, data: s });
    }).catch(e => {
        return res.status(500).json({ estado: false, mensaje: e });
    });
};
module.exports = controller;
