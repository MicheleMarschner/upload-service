// Imports
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Schema
const UserSchema = new mongoose.Schema({
	method: {
		type: String,
		enum: ['local', 'google', 'facebook'],
		required: true
	},
	local: {
		email: {
			type: String,
			lowercase: true
		},
		password: { type: String }
	},
	google: {
		id: {
			type: String
		},
		email: {
			type: String,
			lowercase: true
		}
	},
	facebook: {
		id: {
			type: String
		},
		email: {
			type: String,
			lowercase: true
		}
	},
	name: { type: String, required: [true, 'Name is required'] }
});
// Model methods
// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
	if (this.method !== 'local') {
		return next();
	}
	const salt = await bcrypt.genSalt(10);
	this.local.password = await bcrypt.hash(this.local.password, salt);
	return next();
});
// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};
// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.local.password);
};
// Export module
module.exports = mongoose.model('User', UserSchema);
