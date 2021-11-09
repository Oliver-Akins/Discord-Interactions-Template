import { discord_api_base } from "~/constants";
import { config, db, log } from "~/main";
import axios from "axios";
import glob from "glob";
import path from "path";

var global: CreateApplicationCommand[] = [];
var guilds: {[index: string]: CreateApplicationCommand[]} = {};

/*
Register all the Discord commands, while making sure that in development mode
the commands are registered in a way that makes them automatically updated for
use in the development guild.
*/
export async function init_commands() {

	// Register all the Discord commands that need to be registered, while making
	// sure that in development mode we register the commands that are needed.
	let commands = glob.sync(
		`commands/**/!(*.map)`,
		{ cwd: __dirname, nodir: true }
	);

	/*
	Figure out how to structure the register object modification in a
	logical way that doesn't spam the Discord API. This should follow
	the below rules:

	1) If `dev.enabled`, no commands should be registered in global space
	2) If `dev.enabled`, all commands should be registered in `dev.guild`
	3) When making the request to Discord, should use the batch update
		endpoint whenever possible.
	4) Should remove commands if they are now disabled but exist in Discord
	*/
	for (var cmdpath of commands) {
		let command: Command = (await import(path.join(__dirname, cmdpath))).default;

		/*
		Verify command structure for Discord. This confirms the following rules:
		1) That slash commands cannot have any special characters except a dash
		2) That context menu commands cannot have any any special characters
			except dash and spaces.
		*/
		if (
			(command.structure.type ?? 1) == 1
			&& !command.structure.name.match(/^[\w-]{1,32}$/u)
		) {
			log.warn(`${command.structure.name} doesn't match Discord's requirements, skipping registration.`);
			continue;
		} else if (!command.structure.name.match(/^[\w\- ]{1,32}$/u)) {
			log.warn(`${command.structure.name} doesn't match Discord's requirements, skipping registration`);
			continue;
		}

		if (command.enabled) {
			log.debug(`Attempting to register command: ${command.structure.name}`);

			if (!config.dev.enabled) {

				// Guild specific command
				if (command.guilds) {

					// Add the command to each guild it should be registered in
					// so that we can bulk-add the relevant commands with fewer
					// API calls
					for (var gid of command.guilds) {

						// Prevent pushing on undefined guild list
						if (!guilds[gid]) {
							guilds[gid] = [];
						};
						guilds[gid].push(command.structure);
						db.commands[command.structure.name] = command;
					};
				}

				else {
					global.push(command.structure);
					db.commands[command.structure.name] = command;
				};
			}

			else {
				if (!guilds[config.dev.guild]) {
					guilds[config.dev.guild] = [];
				};
				guilds[config.dev.guild].push(command.structure);
				db.commands[command.structure.name] = command;
			};
		};
	};

	// register the global commands so that they have a bit more time to update
	let registered_global = await axios.put<AppCommand[]>(
		`${discord_api_base}/applications/${config.discord.app_id}/commands`,
		global,
		{ headers: { "Authorization": `Bot ${config.discord.token}` }}
	).catch((err: Error) => {
		log.error(err.name, err.message);
	});

	if (registered_global?.status !== 200) {
		log.error(`Failed to register global commands. (${registered_global?.statusText})`);
	} else {
		db.raw.global = registered_global.data;
	};

	// register all of the guild-specific commands
	for (var gid in guilds) {

		let registered_guild = await axios.put(
			`${discord_api_base}/applications/${config.discord.app_id}/guilds/${gid}/commands`,
			guilds[gid],
			{ headers: { "Authorization": `Bot ${config.discord.token}` }}
		).catch(err => {
			log.error(err.name, err.message);
		});

		if (registered_guild?.status !== 200) {
			log.error(`Failed to register guild commands for ${gid}. (${registered_guild?.statusText})`);
		} else {
			db.raw.guilds[gid] = registered_guild.data;
		};
	};
};

/*
Deletes all of the application commands from Discord, both global and guild
*/
export async function delete_commands() {};