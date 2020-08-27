//  @desc   Upload files
//  @route  POST /
//  @access Private
exports.uploadFiles = (req, res, next) => {
	res.status(200).json({ success: true, msg: 'Create' });
};
