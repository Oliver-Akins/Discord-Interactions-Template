export enum CommandType {
	slash = 1,
	user,
	message,
};

export enum InteractionCallback {

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

export enum InteractionType {
	Ping = 1,
	ApplicationCommand,
	MessageComponent,
	AutoComplete,
}

/** The message components that Discord accepts */
export enum MessageComponentType {
	ActionRow = 1,
	Button,
	SelectMenu
}

/**
 * The different styles of buttons that Discord supports.
 */
export enum ButtonStyle {
	/** Blurple */ Primary = 1,
	/** Gray */ Secondary,
	/** Green */ Success,
	/** Red */ Danger,

	/** Gray, navigates to a URL */
	Link
}

export const discord_api_base = `https://discord.com/api/v9`;

export const default_db = `{
	"commands": {},
	"components": {},
	"raw": {
		"global": [],
		"guilds": {}
	}
}`