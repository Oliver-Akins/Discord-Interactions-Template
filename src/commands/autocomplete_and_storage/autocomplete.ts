import { db, log } from "~/main";

const data: Command = {
	enabled: true,

	structure: {
		name: `autocomplete`,
		description: `Attempts to autocomplete the option based on what you are typing`,
		type: CommandType.slash,
		options: [
			{
				type: CommandOptionType.String,
				name: `option`,
				description: `What do you want?`,

				// Make sure to tell Discord that we want auto-complete events
				// for this option, otherwise we won't get them
				autocomplete: true,
			}
		]
	},

	processor(event) {

		// We're handling an autocomplete event for this command
		if (event.type == InteractionType.AutoComplete) {
			log.silly(`Suggesting autocomplete`);
			let payload = event.data as AppCommandData;
			let data = db.storage[event.guild_id ?? event.user!.id]["autocomplete"] as string[];

			let query = payload.options!.find(o => o.focused)?.value;

			return {
				type: InteractionResponseType.command_autocomplete_result,
				data: {
					choices: data
						.filter(x => x.match(query))
						.map(x => {return {
							name: x,
							value: x,
						}})
				}
			}
		};

		log.debug(`Autocompleted command is done.`);
		return {
			type: InteractionResponseType.message_with_source,
			data: {
				content: `Good job.`,
				flags: 1 << 6
			}
		}
	}
}
export default data;