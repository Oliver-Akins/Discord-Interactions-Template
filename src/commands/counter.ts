import decrement_button from "~/components/buttons/decrement";
import increment_button from "~/components/buttons/increment";
import { log } from "~/main";

const data: Command = {
	enabled: true,

	structure: {
		name: `counter`,
		description: `Counts how many times the command has been ran`,
		type: CommandType.slash,
	},

	processor(_) {
		log.info(`Counting!`);

		return {
			type: InteractionResponseType.message_with_source,
			data: {
				content: `0`,
				components: [{
					type: MessageComponentType.ActionRow,
					components: [
						increment_button.structure,
						decrement_button.structure
					]
				}]
			},
		};
	}
}
export default data;