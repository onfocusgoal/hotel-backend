const express = require("express");
const { register, login, refreshToken } = require("../controllers/auth");
const { protect } = require("../middleware/protect");

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/refresh").get(protect, refreshToken);

module.exports = router;
