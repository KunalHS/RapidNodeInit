const path = require("path");
const fs = require("fs");

function registerRoutesInFolder(app, folderPath, nameUnder) {
	let base = process.cwd() + "/Server/API/routes";
	let currentDirectory = path.join(base, folderPath);
	let items = fs.readdirSync(currentDirectory);
	for (let item of items) {
		let itemPath = path.join(currentDirectory, item);
		itemStats = fs.lstatSync(itemPath);
		if (itemStats.isFile()) {
			if (path.extname(itemPath) !== ".js") {
				continue;
			}
			let endpoint = require(itemPath);
			if (!Object.keys(endpoint).length) {
				console.log("Endpoint: ${itemPath} is malformed or contains no router");
				continue;
			}

			let endpointUri = path.join(nameUnder, item.replace(".js", ""));
			try {
				app.use(endpointUri, endpoint);
			} catch (err) {
				console.log("Error : ", err);
			}
		}
		if (itemStats.isDirectory()) {
			registerRoutesInFolder(
				app,
				path.join(folderPath, item),
				path.join(nameUnder, item)
			);
		}
	}
}

function addEndpoints(app) {
	registerRoutesInFolder(app, "/AuthFreeRoutes", "/");
	// registerRoutesInFolder(app, "/api", "/api");
}

module.exports = {
	addEndpoints: addEndpoints,
};
