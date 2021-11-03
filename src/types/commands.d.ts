interface Command {
	/**
	 * Whether or not this command is enabled. Setting it to false will remove
	 * it from Discord's systems as a whole, regardless of if it's a guild or
	 * global command.
	 */
	enabled: boolean;

	/**
	 * The guilds that this command gets registered into. Leave undefined
	 * for a global command. When development mode is enabled, this will be
	 * ignored and will register all commands to development guild, and nowhere
	 * else.
	 */
	guilds?: Snowflake[];

	/** The data that gets sent to Discord which represents the command. */
	structure: CreateApplicationCommand;

	/**
	 * The method that handles the interaction when any event comes through
	 * relating to this command. Including autocomplete events.
	 */
	processor(data: Interaction): InteractionResponse;
}

interface CommandRegistrationData {
	global: Command[];
	guilds: {
		[index: Snowflake]: Command[];
	};
}