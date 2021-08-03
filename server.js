require("dotenv").config();
const PORT = process.env.PORT || 9849;
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = require("./router/main.route");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
});

app.use(apiLimiter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "./client/build")));

app.use("/", router);

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => {
	console.info("Running on port", PORT);
});
