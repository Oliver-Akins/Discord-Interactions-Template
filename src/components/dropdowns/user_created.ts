import { log } from "~/main";

const user_select: DynamicComponent = {
	create(...args: [Interaction, ...unknown[]]): SelectMenu {
		log.silly(`Creating the user's dropdown object`);
		let [ event, ..._ ] = args;

		let data = event.data as AppCommandData;

		let options: SelectMenuOption[] = [];
		for (var option of data.options!) {
			options.push({
				label: option.name,
				value: option.name
			});
		};

		return {
			type: MessageComponentType.SelectMenu,
			custom_id: `user-select`,
			options,
			min_values: 0,
			max_values: 2,
		}
	},

	processor(event) {
		log.silly(`Processing a dropdown select event`);

		let data = event.data as SelectMenuData;

		return {
			type: InteractionResponseType.message_with_source,
			data: {
				content: `You selected: ${data.values.join(`, `)}`,
				flags: 1 << 6,
			},
		};
	}
};
export default user_select;