/**
 * The type of Application Command for Discord.
 */
enum CommandType {

	/**
	 * Chat command, accepts user input and can be auto-completed
	 */
	slash = 1,

	/** Context menu (user), receives a user/member as it's sole argument */
	user,

	/** Context menu (message), receives a message object as it's sole argument */
	message,
};

/**
 * The option type for slash commands
 */
enum CommandOptionType {
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