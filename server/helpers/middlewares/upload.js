
import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb){
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});


const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb){
    if(file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/pnj'){
      cb(null, true);
    } else {
      console.log("Non supported format. Please make sure your image is a jpg, jpeg or pnj.");
      cb(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2
  }
});

export default upload;