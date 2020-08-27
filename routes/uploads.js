// Imports
const express = require('express');
const passport = require('passport');
const passportConfig = require('../passport/passport-config');
// Passport strategies assignment
const passportJWT = passport.authenticate('jwt', { session: false });
// Import controllers
const { upload } = require('../middleware/uploadFiles')
const { uploadFiles } = require('../controllers/uploads');
// Create router from express
const router = express.Router();
// Routes mapping
router.route('/').post(passportJWT, upload.single('file'), uploadFiles);

// Export module
module.exports = router;
