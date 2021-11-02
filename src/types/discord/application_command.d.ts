enum ApplicationCommandType {
	/** Slash Command */
	ChatInput = 1,
	User,
	Message,
}

interface ApplicationCommand {
	id: Snowflake;

	/**
	 * The type of this command in Discord.
	 *
	 * Defaults to `ApplicationCommandType.ChatInput` if not provided
	 */
	type?: ApplicationCommandType;
	application_id: Snowflake;
	guild_id?: Snowflake;
	name: string;
	description: string;
	options?: any[];

	/**
	 * Whether or not the command is enabled by default when the app is added to
	 * a guild.
	 *
	 * Default: `true`
	 */
	default_permission?: boolean;
}

enum ApplicationCommandOptionType {
	Subcommand = 1,
	SubcommandGroup,
	String,
	/** Any integer between -2^53 abd 2^53 */
	Integer,
	Boolean,
	User,
	/** Includes and channel types + categories */
	Channel,
	Role,
	/** Includes users and roles */
	Mentionable,
	/** Any double between -2^53 and 2^53 */
	Number,
}


interface ApplicationCommandOption {
	type: ApplicationCommandOptionType;
	name: string;
	description: string;

	/** Default: `false` */
	required?: boolean;

	/**
	 * Choices for `STRING`, `INTEGER`, and `NUMBER` types for the user to pick
	 * from, maximum 25 choices. If specified, these options are the ONLY valid
	 * values for the user to pick from.
	 */
	choices?: ApplicationCommandOptionChoice[];

	/**
	 * If the option is a subcommand or subcommand group type, this nested
	 * options will be the parameters.
	 */
	options?: ApplicationCommandOption[];
}

interface ApplicationCommandOptionChoice {
	/** 1-100 character long choice name */
	name: string;

	/**
	 * Value that will be returned if the user picks this option. Maximum 100
	 * characters if it's a string.
	 */
	value: string | number;
}

/**
 * ! Important !
 * The `value` and `options` keys are mutually exclusive.
 */
interface ApplicationCommandInteractionDataOption {
	name: string;
	type: ApplicationCommandOptionType;

	/** This is the value of the pair. */
	value?: ApplicationCommandOptionType;

	/** Nested option values if this is a group or subcommand */
	options?: ApplicationCommandInteractionDataOption[];
}