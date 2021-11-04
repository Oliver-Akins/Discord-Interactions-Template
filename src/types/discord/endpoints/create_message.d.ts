/** The data that is sent to Discord to create a message */
interface SendMessage {
	/** Up to 2000 characters */
	content?: string;

	/** Whether the clients should speak the message. Default: `false` */
	tts?: boolean;

	/** The contents of the file */
	file?: any;

	/** The embedded `rich` content. Up to 6000 characters total. */
	embeds?: MessageEmbed[];

	/** This is ONLY used when transmitting via `multipart/form-data` */
	payload_json?: string;

	allowed_mentions?: {};

	message_reference?: {};

	components?: MessageComponent[];

	sticker_ids?: Snowflake[];

	flags?: number;
}