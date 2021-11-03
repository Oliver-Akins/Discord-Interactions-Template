import { InteractionCallback, MessageComponentType, ButtonStyle } from "../../constants";
import { log } from "../../main";

const increment_button: Component = {
	structure: {
		custom_id: `increment`,
		type: MessageComponentType.Button,
		label: `Increment`,
		style: ButtonStyle.Success,
	},

	processor(event) {
		log.info(`Incrementing`);

		let value = parseInt(event.message.content ?? "0");

		return {
			type: InteractionCallback.update_message,
			data: {
				content: `${++value}`
			}
		};
	}
};
export default increment_button;