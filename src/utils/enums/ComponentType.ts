/** The message components that Discord accepts */
const enum MessageComponentType {
	ActionRow = 1,
	Button,
	SelectMenu
}

/**
 * The different styles of buttons that Discord supports.
 */
const enum ButtonStyle {
	/** Blurple */ Primary = 1,
	/** Gray */ Secondary,
	/** Green */ Success,
	/** Red */ Danger,

	/** Gray, navigates to a URL */
	Link
}