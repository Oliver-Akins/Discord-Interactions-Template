// Filepath alias resolution
import "module-alias/register";

import { clean_exit } from "~/utils/clean_exit";
import { init_components } from "~/components";
import { init_webserver } from "~/webserver";
import { init_commands } from "~/commands";
import { Logger } from "tslog";
import toml from "toml";
import fs from "fs";


// Load the config from disk
if (!fs.existsSync(`config.toml`)) {
	console.log(`Please create the config and edit it then run the server again.`);
	process.exit(1);
};
export const config: Config = toml.parse(fs.readFileSync(`config.toml`, `utf-8`));


// Setup the logger with the appropriate settings
export const log = new Logger({
	displayFilePath: `hidden`,
	displayFunctionName: false,
	displayDateTime: true,
	displayLogLevel: true,
	minLevel: config.log.level,
	name: config.log.name,
});


// Load the database
if (!fs.existsSync(`data/db.json`)) {
	log.info(`Can't find database file, creating default`);
	try {
		fs.writeFileSync(`data/db.json`, `{}`);
	} catch (err) {
		log.error(`Unable to create the default database, make sure the data directory exists.`);
		process.exit(1);
	};
};
export const db: Database = {
	commands: {},
	components: {},
	raw: {
		global: [],
		guilds: {},
	},
	storage: JSON.parse(fs.readFileSync(`data/db.json`, `utf-8`))
};


// Signal listeners to save persistent storage
process.on(`SIGINT`, clean_exit);
process.on(`SIGTERM`, clean_exit);
process.on(`uncaughtException`, clean_exit);


// Setup the utilities that are needed throughout the system
async function init() {
	await init_webserver();
	await init_components();
	await init_commands();
};

init();