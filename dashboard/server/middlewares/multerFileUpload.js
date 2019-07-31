const uniqid = require('uniqid');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: './.tmp',
  filename(req, file, cb) {
    cb(null, `${uniqid.process()}.${file.originalname.split('.').pop()}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
