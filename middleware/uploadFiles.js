
// Require multer for image uploading and multers3 to upload directly to s3
const multer = require("multer");
/*const multerS3 = require('multer-s3');*/
const path = require('path');


/*
// Configure aws s3 SDK (update authentication)
const aws = require('aws-sdk');
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
const s3 = new aws.S3();*/


const checkFileType = (file, cb) => {
  // Allowed ext
  let filetypes;
  if(file.fieldname === "profile_picture") {
    filetypes = /jpeg|jpg|png|gif/;
  }
  else if(file.fieldname === "file") {
    filetypes = /jpeg|jpg|png|gif|avi|mp4|wmv|f4v/;
  }
  
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
      return cb(null,true);
  } else {
      return cb(new Error(`Error: Wrong Format chosen! Please only use ${filetypes}` ), false);
      
  }
}



/* customized filename as well? Or the key the filename here?
filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
*/

exports.upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public') //cb stands for callback 
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + Date.now() + file.originalname)
    }
  }),
  //limits:{fileSize: 1000000},
  fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
  }
});

/*
const upload = multer({
  limits: {
    fileSize: 1048576 // 1MB
  },
  fileFilter: imageFilter, // fileFilter: (req, file, cb) => {checkFileType(file, cb);},
  storage: multerS3({
    s3: s3,
    //?? Set bucket dynamically
    bucket: function (req, file, cb) {
      cb(null, file.fieldname);
    },
    // Set public read permissions
    acl: 'public-read',
    //set to max. recommendation of one year
    cacheControl: 'max-age=31536000',
    // Auto detect contet type
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    //key is the name of the file in the bucket
    //?? file.fieldname correlates with 'name' right? - yes
    key: function (req, file, cb) {
      const key = `${file.fieldname}/${req.user.id}_${Date.now().toString()}${path.extname(file.originalname)}`
      cb(null, key);
    }
  })
});*/


//?? Missing: Error Handler
