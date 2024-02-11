require("dotenv").config();
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

var lastProcessedTime = Date.now();
var timeOutForInactiveConnection = setTimeout(closeIfInactive, 10000);

const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING, {
	serverApi: {
		version: "1",
		strict: true,
		deprecationErrors: true,
	},
});

async function openConnection() {
	mongoose.set("strictQuery", true);
	try {
		if (!client.topology || !client.topology.isConnected()) {
			await client.connect();
		}
		await client.db("admin").command({ ping: 1 });
		console.log("Successfully connected to MongoDB!");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
}

async function closeIfInactive() {
	const inactiveTime = new Date() - lastProcessedTime;
	if (client.topology && client.topology.isConnected()) {
		if (inactiveTime > 60000) {
			await client.close();
			console.log("MongoDB Disconnected");
		} else {
			clearTimeout(timeOutForInactiveConnection);
			timeOutForInactiveConnection = setTimeout(closeIfInactive, 30000);
		}
	}
}

function closeConnection() {
	lastProcessedTime = Date.now();
	clearTimeout(timeOutForInactiveConnection);
	timeOutForInactiveConnection = setTimeout(closeIfInactive, 30000);
}

function getDatabaseClient() {
	return client;
}

module.exports = {
	open: openConnection,
	close: closeConnection,
	client: getDatabaseClient,
};
