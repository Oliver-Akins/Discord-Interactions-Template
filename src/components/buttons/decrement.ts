import { MessageComponentType, ButtonStyle } from "~/utils/enums/ComponentType";
import { InteractionResponseType } from "~/utils/enums/InteractionType";
import { log } from "~/main";

const decrement_button: Component = {
	structure: {
		custom_id: `decrement`,
		type: MessageComponentType.Button,
		label: `Decrement`,
		style: ButtonStyle.Danger,
	},

	processor(event) {
		log.info(`Decrementing`);

		let value = parseInt(event.message.content ?? "0");

		return {
			type: InteractionResponseType.update_message,
			data: {
				content: `${--value}`
			}
		};
	}
};
export default decrement_button;