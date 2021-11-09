interface Config {
	dev: {
		enabled: boolean;
		guild: Snowflake;
	};
	discord: {
		app_id: string;
		public_key: string;
		token: string;
	};
	server: {
		host: string;
		port: number;
	};
	log: {
		name: string;
		level: "silly" | "trace" | "debug" | "info" | "warn" | "error" | "fatal";
	};
};