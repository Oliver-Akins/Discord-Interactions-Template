import { db, log } from "~/main";

const data: Command = {
	enabled: true,

	structure: {
		name: `dbadd`,
		description: `Adds a string into the auto-complete database for the server`,
		type: CommandType.slash,
		options: [
			{
				type: CommandOptionType.String,
				name: `option`,
				description: `An option for the autocomplete to use`,
				required: true,
			}
		]
	},

	processor(event) {
		let payload = event.data as AppCommandData;
		let target = event.guild_id ?? event.user!.id
		log.info(`[${event.id}] Saving user input to database`);


		let guild_data = db.storage[target];
		let choices = guild_data?.["autocomplete"];

		if (!choices) {
			choices = [];
		};

		choices.push(...payload.options!.map(x => x.value));

		if (!guild_data) {
			db.storage[target] = {};
		};

		db.storage[target]["autocomplete"] = choices

		return {
			type: InteractionResponseType.message_with_source,
			data: {
				content: `Data saved to possible options for the autocomplete tester`,
				flags: 1 << 6
			},
		};
	}
}
export default data;