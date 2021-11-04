import user_select from "~/components/dropdowns/user_created";
import { log } from "../main";

const data: Command = {
	enabled: true,

	structure: {
		name: `select`,
		description: `Creates a dropdown'd message for testing purposes`,
		type: CommandType.slash,
		options: [
			{
				type: CommandOptionType.String,
				name: `Option 1`,
				description: `The first option in the dropdown`,
			},
			{
				type: CommandOptionType.String,
				name: `Option 2`,
				description: `The second option in the dropdown`,
			},
			{
				type: CommandOptionType.String,
				name: `Option 3`,
				description: `The third option in the dropdown`,
				required: false,
			},
			{
				type: CommandOptionType.String,
				name: `Option 4`,
				description: `The fourth option in the dropdown`,
				required: false,
			}
		]
	},

	processor(event) {
		log.info(`Creating a dropdown`);

		return {
			type: InteractionResponseType.message_with_source,
			data: {
				content: `Select a thing!`,
				components: [
					{
						type: MessageComponentType.ActionRow,
						components: [
							user_select.create(event)
						]
					}
				]
			},
		};
	}
}
export default data;