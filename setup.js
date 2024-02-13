#!/usr/bin/env node

const yargs = require("yargs");
const { execSync } = require("child_process");

const argv = yargs
	.command(
		"init [outputDir]",
		"Install files to a specified directory",
		(yargs) => {
			yargs.positional("outputDir", {
				describe: "Output directory",
				default: "./backend",
			});
		}
	)
	.help().argv;

try {
	// Create the output directory
	execSync(`mkdir -p ${argv.outputDir}`);

	// Copy the Database, Server, and app.js to the output directory
	execSync(`cp -r ./node_modules/rapidnodeinit/Database ${argv.outputDir}`);
	console.log(`Database Folder copied to ${argv.outputDir}`);
	execSync(`cp -r ./node_modules/rapidnodeinit/Server ${argv.outputDir}`);
	console.log(`Server Folder copied to ${argv.outputDir}`);
	execSync(`cp -r ./node_modules/rapidnodeinit/app.js ${argv.outputDir}`);
	console.log(`App.js copied to ${argv.outputDir}`);

	// Log success message
	console.log("Setup completed");
} catch (error) {
	console.error("Error:", error.message);
	process.exit(1); // Exit with a non-zero status to indicate an error
}
