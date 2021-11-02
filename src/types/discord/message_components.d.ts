type MessageComponent = ActionRow | Button | LinkButton | SelectMenu

/** The message components that Discord accepts */
enum MessageComponentType {
	ActionRow = 1,
	Button,
	SelectMenu
}

/**
 * The component which tells Discord how to display other components. Action
 * rows can only contain the following:
 *	- Up to 5 Buttons
 *	- Up to 1 Select Menu. If it has a select menu, nothing else can be included in the row.
 */
interface ActionRow {
	type: MessageComponentType.ActionRow;
	components: Exclude<MessageComponent, ActionRow>[];
}

/**
 * The different styles of buttons that Discord supports.
 */
enum ButtonStyle {
	/** Blurple */ Primary = 1,
	/** Gray */ Secondary,
	/** Green */ Success,
	/** Red */ Danger,

	/** Gray, navigates to a URL */
	Link
}

/** Triggers a basic interaction event */
interface Button {
	type: MessageComponentType.Button;
	style: ButtonStyle,
	label?: string;
	emoji?: PartialEmoji;
	custom_id: string;
	disabled?: boolean;
}

/** Prompts the user to navigate to a website */
interface LinkButton {
	type: MessageComponentType.Button;
	style: ButtonStyle.Link;
	url: string;
	label?: string;
	disabled?: boolean;
}

/**
 * The select menu for messages
 */
interface SelectMenu {
	type: MessageComponentType.SelectMenu;
	custom_id: string;
	options: SelectOption[];
	placeholder?: string;
	min_values?: number;
	max_values?: number;
	disabled?: boolean;
}

/**
 * The options that can be chosen from in the select menu components.
 */
interface SelectOption {
	label: string;
	value: string;
	description?: string;
	emoji?: PartialEmoji;
	default?: boolean;
}

/**
 * The information that is used to represent emoji within the message
 * components.
 */
interface PartialEmoji {
	name: string;
	id: Snowflake;
	animated: boolean;
}