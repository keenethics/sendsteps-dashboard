const uniqid = require('uniqid');
const multer = require('multer');
const { fileIsImage } = require('../helpers/validationHelpers');

const storage = multer.diskStorage({
  destination: './.tmp',
  filename(req, file, cb) {
    cb(null, `${uniqid.process()}.${file.originalname.split('.').pop()}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1000 * 1000 },
  fileFilter: function(req, file, cb) {
    if (fileIsImage(file.originalname)) return cb(null, true);
    cb(null, false);
  }
}).single('file');

async function uploadFile(req, res, next) {
  upload(req, res, function(err) {
    if (err) {
      return res.status(413).send({ error: `${err.message}. Max allowed file size is 2MB.` });
    }
    next();
  });
}

module.exports = { uploadFile };
