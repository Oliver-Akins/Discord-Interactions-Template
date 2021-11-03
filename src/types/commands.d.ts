interface Command {
	/**
	 * Whether or not this command is enabled. Setting it to false will remove
	 * it from Discord's systems as a whole, regardless of if it's a guild or
	 * global command.
	 */
	enabled: boolean;

	/**
	 * The guilds that this command gets registered into. Leave as an empty
	 * array for a global command. When development mode is enabled, this will
	 * be ignored and will use the development server option.
	 */
	guilds: Snowflake[];

	/** The data that gets sent to Discord which represents the command. */
	structure: CreateApplicationCommand;

	/** The method that handles the interaction when a user runs the command */
	processor(): void
}