interface Database {
	commands: {
		[index: string]: Command;
	};
	components: {
		[index: string]: any;
	};
	raw: {
		global: ApplicationCommand[];
		guilds: {
			[index: string]: ApplicationCommand[];
		};
	};
}