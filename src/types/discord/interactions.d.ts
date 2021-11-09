//===========================================================================\\
// INCOMING INTERACTION DATA

interface Interaction {
	id: Snowflake;
	application_id: Snowflake;
	type: InteractionType;
	data?: InteractionData;
	guild_id?: Snowflake;
	channel_id?: Snowflake;

	member?: GuildMember;
	user?: User;

	token: string;
	version: number;

	message: Message;
}

type InteractionData = CommandPayload | ComponentPayload;

type CommandPayload = AppCommandData | ContextMenuCommand;

interface AppCommandData {
	id: Snowflake;
	name: string;
	type: CommandType;
	resolved?: ResolvedReferences;
	options?: CommandOptionData[];
}

interface ContextMenuCommand extends AppCommandData {
	target_id: Snowflake;
}

interface ResolvedReferences {
	users?: {[index: string]: User};
	roles?: {[index: string]: unknown};
	members?: {[index: string]: GuildMember};
	channels?: {[index: string]: unknown};
	messages?: {[index: string]: unknown};
}

type CommandOptionData = OptionData | SubcommandOptionData;

interface SubcommandOptionData {
	name: string;
	type: CommandOptionType.Subcommand | CommandOptionType.SubcommandGroup;
	options: CommandOptionData[];
}

interface OptionData {
	name: string;
	type: CommandOptionType;
	value: any;
	focused?: boolean;
}

type ComponentPayload = ComponentData | SelectMenuData;

interface ComponentData {
	custom_id: string;
	component_type: MessageComponentType;
}

interface SelectMenuData extends ComponentData {
	component_type: MessageComponentType.SelectMenu;
	values: string[];
}


//===========================================================================\\
// OUTGOING INTERACTION DATA

interface InteractionResponse {
	type: InteractionResponseType;
	data?: InteractionResponseData;
}

interface MessageResponse {
	tts?: boolean;
	content?: string;
	embeds?: Embed[];
	allowed_mentions?: any;
	flags?: number;
	components?: any[];
	attachments?: any[];
}

interface AutocompleteResponse {
	/** Max: 25 choices */
	choices: CommandOptionChoice[];
}

interface CommandOptionChoice {
	name: string;

	/**
	 * Type depends on the type of the option the choice belongs to, if the type
	 * is string, it has a maximum length of 100 characters.
	 */
	value: string | number;
}


//===========================================================================\\
// APPLICATION COMMANDS

type AppCommand = AppCommandBase | AppSlashCommand;

interface AppCommandBase {
	id: Snowflake;

	/**
	 * The type of this command in Discord.
	 *
	 * Defaults: `CommandType.slash`
	 */
	type?: CommandType;
	application_id: Snowflake;
	guild_id?: Snowflake;
	name: string;
	description: string;

	/**
	 * Whether or not the command is enabled by default when the app is added to
	 * a guild.
	 *
	 * Default: `true`
	 */
	default_permission?: boolean;

	version: Snowflake;
}

interface AppSlashCommand extends AppCommandBase {
	options: unknown[];
}

//===========================================================================\\
// MESSAGE COMPONENTS

interface ActionRow {
	type: MessageComponentType.ActionRow;
	components: Components[];
}

type Components = Button | LinkButton | SelectMenu;

interface Button {
	type: MessageComponentType.Button;
	custom_id: string;
	style: Exclude<ButtonStyle, ButtonStyle.Link>;
	disabled?: boolean;
	label?: string;
	emoji?: PartialEmoji;
}

interface LinkButton {
	type: MessageComponentType.Button;
	style: ButtonStyle.Link;
	url: string;
}

interface SelectMenu {
	type: MessageComponentType.SelectMenu;
	custom_id: string;
	options: SelectMenuOption[];
	placeholder?: string;
	min_values?: number;
	max_values?: number;
	disabled?: boolean;
}

interface SelectMenuOption {
	label: string;
	value: string;
	description?: string;
	emoji?: PartialEmoji;
	default?: boolean;
}