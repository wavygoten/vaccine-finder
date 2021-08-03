const express = require("express");
const router = express.Router();
const zipcodes = require("zipcodes");
const axios = require("axios");
router.get("/", (req, res) => {
	console.log("Inside the homepage callback function");
	// res.render('loggedin', {session: req.sessionID});
	res.json({ message: "You got home page!" });
});

router.post("/api/search", async (req, res) => {
	try {
		const { search } = req.body;
		let lname = [];
		let laddy = [];
		let lphone = [];
		var latitude = zipcodes.lookup(search).latitude.toFixed(2);
		var longitude = zipcodes.lookup(search).longitude.toFixed(2);
		var vaccineEndpoint = `https://api.us.castlighthealth.com/vaccine-finder/v1/provider-locations/search?medicationGuids=779bfe52-0dd8-4023-a183-457eb100fccc,a84fb9ed-deb4-461c-b785-e17c782ef88b,784db609-dc1f-45a5-bad6-8db02e79d44f&lat=${latitude}&long=${longitude}&radius=50`;
		await axios
			.get(vaccineEndpoint)
			.then((res) => {
				const document = res.data;
				const providers = document.providers;
				for (provider in providers) {
					if (providers[provider].in_stock) {
						lname.push(providers[provider].name);
						laddy.push(providers[provider].address1);
						lphone.push(providers[provider].phone);
					}
				}
			})
			.catch((err) => {
				console.log(err);
			});
		res.json({ stores: lname, addresses: laddy, numbers: lphone });
	} catch (error) {
		// res.json({ error:  });
		// console.log(error.message);
		if (error.message === "Cannot read property 'latitude' of undefined") {
			res.json({ error: "No zip code found" });
		}
	}
});

module.exports = router;
