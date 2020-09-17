const fs = require('fs');
const pictureFolder = './public/';

//  @desc   Upload files
//  @route  POST /
//  @access Private
exports.uploadFiles = async (req, res, next) => {
    try {
        const {file, fileValidationError} = req;
        if (!file) {
			console.log('no picture added');
			return res.status(400).send("no picture added");
        }
        if (fileValidationError) {
            return res.status(400).send(fileValidationError);
        }
        
        let count = 0;
        await fs.readdir(pictureFolder, (err, files) => {
            files.forEach(file => {
            let str = file;
            let userId = str.substring(str.lastIndexOf("_") + 1, str.lastIndexOf("-"));
            if (userId === req.user.id) {
                /*fs.unlink( `./public/${file}`, function( err ) {
                    if ( err ) return console.log( err );
                });*/
              
            }

            });
          });
      
        return res.status(201).send({ "location": `http://localhost:4000/${req.file.filename}` });
    }
    catch (err) {
        console.log(err);
    }
	
};
