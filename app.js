require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");
const errorHandler = require("./middleware/error");

const app = express();

app.use(cookieParser());
app.use(express.json());

// database
connectDB();

app.get("/", (req, res) => {
	res.send("Everything is fine");
});

app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/bookHotel"));

app.use(errorHandler);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running on port ${port}`));
