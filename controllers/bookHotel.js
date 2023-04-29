const { Hotel } = require("../models/Hotel.js");

exports.bookHotel = async (req, res, next) => {
	const { item } = req.body;

	try {
		const hotel = await Hotel.create({ ...item });
		res.status(200).json({ success: true, hotel });
	} catch (error) {
		next(error);
	}
};

exports.getBookedHotel = async (req, res, next) => {
	const { id } = req.params;
	try {
		const hotels = await Hotel.find({ user_id: id });
		res.status(200).json({ success: true, hotels });
	} catch (error) {
		next(error);
	}
};
