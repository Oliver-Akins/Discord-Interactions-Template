enum InteractionType {
	Ping = 1,
	ApplicationCommand,
	MessageComponent,
	AutoComplete,
}

enum InteractionCallback {

	/** ACK a Ping */
	pong = 1,

	/** Respond to an interaction with a message */
	message_with_source,

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

/** The data that must be returned to Discord so they know we got the message */
interface InteractionResponse {
	type: InteractionCallback;
	data?: SendMessage;
}

interface Interaction {
	id: Snowflake;
	application_id: Snowflake;
	type: InteractionType;

	/**
	 * This is always present for Application Commands and Message Components,
	 * it is optional for the purpose of future-proofing new interaction types.
	 */
	data?: InteractionData;
	guild_id?: Snowflake;

	/**
	 * The guild member object for the user that triggered the interaction only
	 * present when the interaction is invoked from a guild. This includes
	 * member permissions.
	 */
	member?: GuildMember;

	/**
	 * The user data for the user that invoked the interaction. This is only
	 * present when the interaction is invoked in a Direct Message channel.
	 */
	user?: User;

	/** A token to allow continuing responses to the interaction. */
	token: string;

	/** The version of this interaction event. */
	version: 1;

	/**
	 * Only present for Message Component interactions. This is the message
	 * object that the component is attached to.
	 */
	message: Message;
}

type InteractionData = ApplicationCommandInteractionData | MessageComponentInteractionData

interface ApplicationCommandInteractionData {
	/** The ID of the invoked command */
	id: string;

	/** The name of the invoked command */
	name: string;

	/** The type of the invoked command */
	type: ApplicationCommandType;

	resolved?: any;

	options?: ApplicationCommandInteractionDataOption[];
}

interface ApplicationCommandInteractionDataOption {
	name: string;
	type: ApplicationCommandOptionType;

	/** The values of the pairs */
	value?: ApplicationCommandOptionType;

	/** Present if the option is a group or subgroup */
	options?: ApplicationCommandInteractionDataOption[];

	/** Only present on User and Message commands */
	target_id?: Snowflake;
}

interface MessageComponentInteractionData {
	custom_id: string;
	component_type: MessageComponentType;
	values: SelectOption[];
}