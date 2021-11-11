import { log } from "~/main";

const data: Command = {
	enabled: true,

	structure: {
		name: `ping`,
		description: `Ping-Pongs`,
		type: CommandType.slash,
	},

	processor(_) {
		log.info(`Ponging!`);
		return {
			type: InteractionResponseType.message_with_source,
			data: {
				content: `Pong!`,
			},
		};
	}
}
export default data;