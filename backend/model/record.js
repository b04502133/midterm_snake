const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Record = new Schema({
	name: {
		type: String,
		required: [true, 'User Name is required.']
	},
	score: {
		type: Number,
		required: [true, 'User Name is required.']
	},
});

module.exports = mongoose.model('Record', Record);
