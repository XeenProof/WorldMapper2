const { model, Schema, ObjectId } = require('mongoose');

const regionSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		capital: {
			type: String,
			required: false
		},
		leader: {
			type: String,
			required: false
		},
		owner: {
			type: String,
			required: true
		},
		parent: {
			type: String,
			required: true
		},
		last_opened: {
			type: String,
			required: true
		},
		children: [String],
		landmarks: [String],
	},
	{ timestamps: true }
);

const Region = model('Region', regionSchema);
module.exports = Region;