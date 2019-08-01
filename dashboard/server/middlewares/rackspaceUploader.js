const fs = require('fs');
const path = require('path');
const client = require('../config/rackspace.js');
const fileIsImage = require('../helpers/validator.js');


require('dotenv-safe').config();

function deleteTempFile(path) {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
}

function uploadPhotoToRackspace(fileToUpload) {
  const filePath = path.join(__dirname, '../../', fileToUpload.path)
  return new Promise((resolve, reject) => {
    try {
      if (!fileIsImage(filePath)) {
        deleteTempFile(filePath);
        return reject('Wrong file extation.');
      }
      const readStream = fs.createReadStream(filePath);
      client.getContainer(process.env.RACKSPACE_CONTAINER, (err, container) => {
        if (err) {
          console.error(err)
          return reject(err);
        };
        
        const upload = client.upload({
          container: container,
          remote: fileToUpload.filename,
        });
        
        upload.on('error', (err) => {
          console.error(err);
          deleteTempFile(filePath);
          reject(err);
        });
        
        upload.on('success', (file) => {
          file.client.getFile(container, file.name, (err, uploadedFile) => {
            const fileUrl = `${uploadedFile.container.cdnSslUri}/${uploadedFile.name}`;
            deleteTempFile(filePath);
            resolve(fileUrl);
          });
        });
        
        readStream.pipe(upload);
      });
    } catch (err) {
      console.error(err);
      deleteTempFile(filePath);
      reject(err);
    }  
  })
}

module.exports = uploadPhotoToRackspace;
