interface CreateApplicationCommand {
	/** 1-32 character long name */
	name: string;

	/** 1-100 character long description */
	description: string;

	/** The parameters for the command */
	options?: ApplicationCommandOption[];

	/** Whether the command is enabled by default when the app is added to a guild/ */
	default_permission?: boolean;

	/** The type of the command. Defaults to `1` if not set */
	type?: ApplicationCommandType;
}