require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const API = require("./API/ApiEndpoints");
const DatabaseConnectionPath = path.join(
	process.cwd(),
	"./Database/DatabaseConnection"
);
const DatabaseConnection = require(DatabaseConnectionPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

async function startServer() {
	API.addEndpoints(app);
	let server = app.listen(process.env.PORT_NUM, async function (req, res) {
		console.log(
			"Server setup complete, Listening on Port : " + process.env.PORT_NUM
		);
	});
	return server;
}

async function stopServer(server) {
	await server.close(async function () {
		await DatabaseConnection.close();
	});
}

module.exports = {
	start: startServer,
	close: stopServer,
};
