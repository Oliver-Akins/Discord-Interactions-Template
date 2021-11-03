/**
 * The type of Application Command for Discord.
 */
export enum CommandType {

	/**
	 * Chat command, accepts user input and can be auto-completed
	 */
	slash = 1,

	/** Context menu (user), receives a user/member as it's sole argument */
	user,

	/** Context menu (message), receives a message object as it's sole argument */
	message,
};