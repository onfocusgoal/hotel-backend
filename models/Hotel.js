const { Schema, model } = require("mongoose");

const hotelSchema = Schema({
	name: { type: String, required: true },
	price: { type: String },
	people: { type: String },
	dates: { type: Object },
	user_id: { type: String },
});

exports.Hotel = model("Hotel", hotelSchema);
