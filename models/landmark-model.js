const { model, Schema, ObjectId } = require('mongoose');

const landmarkSchema = new Schema(
	{
		id: {
			type: Number,
			required: true
		},
		landmark: {
			type: String,
			required: true
		}
	}
);

const Landmark = model('Landmark', landmarkSchema);
module.exports = Landmark;