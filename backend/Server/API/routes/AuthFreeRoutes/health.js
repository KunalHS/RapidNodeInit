const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	console.log("Health Check");
	res.status(200).send("Health OK");
});

module.exports = router;
