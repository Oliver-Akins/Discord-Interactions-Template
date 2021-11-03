import { Server, ServerRoute } from "@hapi/hapi";
import { config, log } from "./main";
import glob from "glob";
import path from "path";

export async function init_webserver() {
	const server = new Server({
		port: config.server.port,
	});


	// Register all the endpoints that we need for the server functionality
	let files = glob.sync(
		`endpoints/**/!(*.map)`,
		{ cwd: __dirname, nodir: true }
	);
	for (var file of files) {
		let route: ServerRoute = (await import(path.join(__dirname, file))).default;
		log.debug(`Registering route: ${route.method} ${route.path}`);
		server.route(route);
	};
};