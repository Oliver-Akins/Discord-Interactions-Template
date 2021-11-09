import { log } from "../main";

const data: Command = {
	enabled: true,

	structure: {
		name: `Word Count`,
		description: ``,
		type: CommandType.message,
	},

	processor(event) {
		log.debug(`Getting a message's word count through context menu command`);

		let data = event.data as ContextMenuCommand;

		let content = data.resolved?.messages?.[data.target_id].content;
		let wc = content?.split(` `)?.length;
		let characters = content?.length;

		return {
			type: InteractionResponseType.message_with_source,
			data: {
				content: `That message has ${wc} words and ${characters} characters in it.`,
				flags: 1 << 6,
			}
		};
	}
}
export default data;