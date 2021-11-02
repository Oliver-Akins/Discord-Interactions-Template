interface Config {
	dev: {
		enabled: boolean;
		guild: Snowflake;
	};
	discord: {
		token: string;
	};
	server: {
		host: string;
		port: number;
	};
};