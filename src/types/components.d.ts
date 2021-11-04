interface BaseComponent {
	processor(event: Interaction): any;
}

interface StaticComponent extends BaseComponent {
	create?: never;
	structure: Components;
}

interface DynamicComponent extends BaseComponent {
	create(...args: unknown[]): Components;
	structure?: never;
}