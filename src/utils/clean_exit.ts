import { db, log } from "~/main";
import fs from "fs";

export function clean_exit() {
	log.info(`Exiting the program cleanly`);

	// Attempt to write the persistent storage to the database
	try {
		fs.writeFileSync(
			`./data/db.json`,
			JSON.stringify(db.storage)
		);
	} catch (err) {
		log.error(`Couldn't save program storage properly, writing to log.`, db.storage);
	};

	process.exit(1);
};