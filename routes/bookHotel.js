const { bookHotel, getBookedHotel } = require("../controllers/bookHotel");
const { protect } = require("../middleware/protect");

const router = require("express").Router();

router.route("/hotel").post(protect, bookHotel);
router.route("/hotel/:id").get(protect, getBookedHotel);

module.exports = router;
