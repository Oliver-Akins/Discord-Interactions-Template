import { config, log } from "./main";
import glob from "glob";
import path from "path";

export async function init_commands() {
	// Register all the Discord commands that need to be registered, while making
	// sure that in development mode we register the commands that are needed.
	let commands = glob.sync(
		`commands/**/!(*.map)`,
		{ cwd: __dirname, nodir: true }
	);
	let register: CommandRegistrationData = {
		global: [],
		guilds: {}
	};
	let remove: Command[] = [];
	for (var cmdpath of commands) {
		let command: Command = (await import(path.join(__dirname, cmdpath))).default;

		if (command.enabled) {
			log.debug(`Attempting to register command: ${command.structure.name}`);

			/* TODO
			Figure out how to structure the register object modification in a
			logical way that doesn't spam the Discord API. This should follow
			the below rules:

			1) If `dev.enabled`, no commands should be registered in global space
			2) If `dev.enabled`, all commands should be registered in `dev.guild`
			3) When making the request to Discord, should use the batch update
				endpoint whenever possible.
			4) Should remove commands if they are now disabled but exist in Discord
			*/
		};
	};
}