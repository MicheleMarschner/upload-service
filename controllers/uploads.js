//  @desc   Upload files
//  @route  POST /
//  @access Private
exports.uploadFiles = (req, res, next) => {
	const {file, fileValidationError} = req;
        if (!file) {
        //set Profile picture to dummy
        console.log('no picture added');
        }
        if (fileValidationError) {
            return res.status(400).send(fileValidationError);
        }
      
        return res.status(201).send({ "location": `http://localhost:4000/${req.file.filename}` });
};
