interface BaseComponent {
	processor(event: Interaction): any;
}

interface StaticComponent extends BaseComponent {
	custom_id?: never;
	create?: never;
	structure: Components;
}

interface DynamicComponent extends BaseComponent {
	custom_id: string;
	create(...args: unknown[]): Components;
	structure?: never;
}

type Component = StaticComponent | DynamicComponent;