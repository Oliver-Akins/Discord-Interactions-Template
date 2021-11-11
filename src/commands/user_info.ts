import { log } from "~/main";

const data: Command = {
	enabled: true,

	structure: {
		name: `User Info`,
		description: ``,
		type: CommandType.user,
	},

	processor(event) {
		log.debug(`Getting a user's information through context menu command`);

		let data = event.data as ContextMenuCommand;

		let user = data.resolved?.users?.[data.target_id]!;

		let name = event.user?.username // check if in a DM
			?? event.member?.nick // use member's nickname
			?? event.member?.user?.username; // fall back to their username

		return {
			type: InteractionResponseType.message_with_source,
			data: {
				content: `${name} ran a command targetting ${user.username}`,
				flags: 1 << 6,
			}
		};
	}
}
export default data;