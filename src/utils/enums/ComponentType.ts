/** The message components that Discord accepts */
export enum MessageComponentType {
	ActionRow = 1,
	Button,
	SelectMenu
}

/**
 * The different styles of buttons that Discord supports.
 */
export enum ButtonStyle {
	/** Blurple */ Primary = 1,
	/** Gray */ Secondary,
	/** Green */ Success,
	/** Red */ Danger,

	/** Gray, navigates to a URL */
	Link
}