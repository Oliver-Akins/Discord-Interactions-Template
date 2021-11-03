interface Component {
	structure: Exclude<MessageComponent, ActionRow>;

	processor(event: Interaction): InteractionResponse;
}