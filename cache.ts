import { BotCache, Config } from "./src/types/common.ts";

export const botCache: BotCache = {
	config: {} as Config,
	commands: new Map(),
	managers: [],
	handlers: {},
	startTime: new Date(),
}