import { Request, ResponseToolkit } from "@hapi/hapi";
import { config, db, log } from "~/main";
import boom from "@hapi/boom";
import nacl from "tweetnacl";

export default {
	method: `POST`, path: `/discord/webhook`,
	options: { auth: false },
	async handler(request: Request, _: ResponseToolkit): Promise<InteractionResponse> {

		//===================================================================\\
		// Encryption check required by Discord
		let sig = request.headers[`x-signature-ed25519`];
		let timestamp = request.headers[`x-signature-timestamp`];
		let body: any = request.payload;

		// Verify the body with the app's public key
		let verified = nacl.sign.detached.verify(
			Buffer.from(timestamp + JSON.stringify(body)),
			Buffer.from(sig, `hex`),
			Buffer.from(config.discord.public_key, `hex`)
		);

		if (!verified) {
			throw boom.unauthorized(`invalid request signature`);
		};
		//===================================================================\\

		let data = request.payload as Interaction;

		try {
			let event;
			switch (data.type) {

				// Discord pinging us to make sure we will respond
				case InteractionType.Ping:
					return {
						type: InteractionResponseType.pong
					};

				// Command interaction events (both autocomplete and the final event)
				case InteractionType.AutoComplete:
				case InteractionType.ApplicationCommand:
					event = data.data as CommandPayload;
					return db.commands[event.name].processor(data);

				// Events originating from a button
				case InteractionType.MessageComponent:
					event = data.data as ComponentPayload;
					return db.components[event.custom_id].processor(data);

				// Any events that aren't caught
				default:
					return {
						type: InteractionResponseType.message_with_source,
						data: {
							content: `How did you trigger this? That should be impossible.`,
							flags: 1 << 6
						},
					};
			};
		} catch (err) {
			log.error(`An error occured while processing an interaction`, err);
			return {
				type: InteractionResponseType.message_with_source,
				data: {
					content: `Something went wrong while processing the interaction.`,
					flags: 1 << 6,
				},
			};
		};
	},
};