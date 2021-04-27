const { model, Schema, ObjectId } = require('mongoose');
const Item = require('./item-model').schema;

const regionSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		id: {
			type: Number,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		owner: {
			type: String,
			required: true
		},
		last_opened: {
			type: String,
			required: true
		},
		items: [Item],
	},
	{ timestamps: true }
);

const Region = model('Region', regionSchema);
module.exports = Region;