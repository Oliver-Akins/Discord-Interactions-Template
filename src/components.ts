import { ButtonStyle, MessageComponentType } from "~/utils/enums/ComponentType";
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
		log.info(`Component identified from: ${component_path}`);

		let component: Component = (
			await import(path.join(__dirname, component_path))
		).default;


		// Ensure that the component isn't a LinkButton
		if (
			component.structure.type === MessageComponentType.Button
			&& (<Button|LinkButton>component.structure).style === ButtonStyle.Link
		) {
			continue;
		};

		// Store the reference for the button
		//@ts-expect-error
		db.components[component.structure.custom_id] = component;
	};
}