const data: Command = {
	enabled: true,

	structure: {
		name: `ping`,
		description: `Ping-Pongs`,
		type: ApplicationCommandType.ChatInput,
	},

	processor(data) {
		return {
			type: InteractionCallback.pong,
			data: {
				content: `Pong!`,
			},
		};
	}
}
export default data;