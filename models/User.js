const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const userSchema = Schema({
	name: {
		type: String,
		required: [true, "Please provide your name"],
		trim: true,
	},
	email: {
		type: String,
		required: [true, "Please provide your email"],
		unique: true,
		trim: true,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Please provide a valid email",
		],
	},

	password: {
		type: String,
		required: [true, "Please add a password"],
		minlength: 6,
		select: false,
		trim: true,
	},
	address: {
		type: String,
	},
	phone: { type: String },
	dateOfBirth: { type: Date },

	resetPasswordToken: String,
	resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	await bcrypt.hash(this.password, salt).then((d) => (this.password = d));

	next();
});

userSchema.methods.matchPasswords = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.getAccessToken = async function () {
	return jwt.sign({ id: this._id }, process.env.access_token_secret, {
		expiresIn: "7d",
	});
};

userSchema.methods.getRefreshToken = async function () {
	return jwt.sign({ id: this._id }, process.env.refresh_token_secret, {
		expiresIn: "1d",
	});
};

exports.User = model("User", userSchema);
