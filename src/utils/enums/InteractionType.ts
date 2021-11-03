/** The type of interaction that Discord sends to us */
export enum InteractionType {

	/** Discord's verification that we are still able to respond to requests */
	Ping = 1,

	/** When a user activates a command */
	ApplicationCommand,

	/** When a user uses a message component (button, select, etc.) */
	MessageComponent,

	/**
	 * Autocomplete polls from Discord, this is sent as a user is typing in a
	 * field that accepts autocomplete values
	 */
	AutoComplete,
}

/** The type of response to Discord this is */
export enum InteractionResponseType {

	/** ACK a Ping */
	pong = 1,

	/** Respond to an interaction with a message */
	message_with_source = 4,

	/**
	 * ACK and interaction and edit a response later. The user sees a loading
	 * state.
	 */
	deffered_message_with_source,

	/**
	 * ACK an interaction and edit the original message later. The user does
	 * not see a loading state
	 * ! Only valid for component-based interactions
	 */
	deffered_update_message,

	/**
	 * Edits the message the component was attached to
	 * ! Only valid for component-based interactions
	 */
	update_message,

	/**
	 * Respond to an autocomplete interaction with suggested choices
	 */
	command_autocomplete_result,
}