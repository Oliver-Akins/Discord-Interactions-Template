import { db, log } from "~/main";
import glob from "glob";
import path from "path";

export async function init_components() {

	// Identify all the message components that need to be tracked
	let components = glob.sync(
		`components/**/!(*.map)`,
		{ cwd: __dirname, nodir: true }
	);

	for (var component_path of components) {
		log.debug(`Component identified from: ${component_path}`);

		let component: Component = (
			await import(path.join(__dirname, component_path))
		).default;

		let structure = component.structure;
		let custom_id: string;

		// Ensure that the structure is defined in a way that we can access
		if (structure) {

			// Ensure that the component isn't a LinkButton
			if (
				structure.type === MessageComponentType.Button
				&& structure.style === ButtonStyle.Link
			) {
				continue;
			};

			custom_id = structure.custom_id;
		} else {
			custom_id = component.custom_id!;
		};

		// Store the reference for the component so that we can process it
		// when it is used.
		db.components[custom_id] = component;
	};
}