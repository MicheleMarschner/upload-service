// Imports
const mongoose = require('mongoose');
// Connection
const connectDB = async () => {
	const conn = await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	});
	console.log(`Connected to MongoDB @ ${conn.connection.host}`.cyan.bold);
};
// Export module
module.exports = connectDB;
