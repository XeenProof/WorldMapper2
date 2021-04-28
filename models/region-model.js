const { model, Schema, ObjectId } = require('mongoose');
const Landmark = require('./landmark-model').schema;

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
		children: [String],
		landmarks: [Landmark],
	},
	{ timestamps: true }
);

const Region = model('Region', regionSchema);
module.exports = Region;