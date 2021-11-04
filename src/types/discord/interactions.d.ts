//===========================================================================\\
// INCOMING INTERACTION DATA

interface Interaction {
	id: Snowflake;
	application_id: Snowflake;
	type: InteractionType;
	data?: InteractionData;
	guild_id?: Snowflake;
	channel_id?: Snowflake;

	member?: unknown;
	user?: unknown;

	token: string;
	version: number;

	message: Message;
}

type InteractionData = AppCommandData | ContextMenuCommand | ComponentData | SelectMenuData;

interface AppCommandData {
	id: Snowflake;
	name: string;
	type: CommandType;
	resolved?: unknown[];
	options?: CommandOptionData[];
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


interface ContextMenuCommand extends AppCommandData {
	target_id: Snowflake;
}

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