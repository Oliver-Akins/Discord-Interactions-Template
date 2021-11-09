interface User {
	id: Snowflake;
	username: string;
	discriminator: string;
	avatar?: string;
	bot?: boolean;

	/** Whether the user is an Official Discord System user */
	system?: boolean;

	mfa_enabled?: boolean;

	/** The user's banner hash */
	banner?: boolean;

	/** The user's banner color encode as an integer representation of the hexadecimal color code */
	accent_color?: number;

	/** The user's chosen language option. */
	locale?: string;

	/** Whether the email on the account has been verified. */
	verified?: boolean;

	email?: string;

	/** The flags on a user's account */
	flags?: number;

	/** The user's Nitro subscription type */
	premium_type?: number;

	/** The public flag's on a user's account */
	public_flags?: number;
}

interface GuildMember {
	user?: User;
	nick?: string;
	avatar?: string;
	roles: Snowflake[];
	joined_at: string;
	premium_since?: string;
	deaf: boolean;
	mute: boolean;

	/**
	 * In `GUILD_` events `pending` will always be set, in non-`GUILD_` events,
	 * `pending` will not be set because those events can only be triggered by
	 * non-pending users.
	 */
	pending?: boolean;

	/** Total permissions of the member in the channel, including overwrites,
	 * returned only in interaction objects.
	 */
	permissions?: string;
}

interface WebhookUser {
	id: string;
	username: string;
	avatar: string;
}