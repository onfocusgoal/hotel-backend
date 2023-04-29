const jwt = require("jsonwebtoken");

const { User } = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");

exports.protect = async (req, res, next) => {
	let token;

	const headers = req.headers.authorization;
	if (headers && headers.startsWith("Bearer")) {
		token = headers.split(" ")[1];
	}

	if (!token) {
		return next(
			new ErrorResponse("Not authorized to access this route yes not", 401),
		);
	}

	try {
		const decode = jwt.verify(token, process.env.access_token_secret);
		const user = await User.findById(decode.id);

		if (!user) {
			return next(new ErrorResponse("No user found", 404));
		}

		req.user = user;

		next();
	} catch (error) {
		next(new ErrorResponse("Not authorized to access this route", 401));
	}
};
