// - deps -
import * as Dcd from './deps.ts'
// - Types -
import { Call, Config } from './src/class/class.ts';
import { BotCache, Command } from './src/types/types.ts';
import { loadCommands, loadConfig, loadHandlers } from './src/managers/managers.ts'

// -- Context --

export const cache: BotCache = {
	config: new Config(),
	commands: new Map<String, Command>(),
	managers: new Array<Object>(),
	handlers: new Object(),
	startTime: new Date(),
};


await loadConfig();
await loadCommands();
await loadHandlers();

console.log('starting...');

Dcd.createClient(
	{
		token: cache.config.token,
		intents: [Dcd.Intents.GUILDS, Dcd.Intents.GUILD_MESSAGES],
		eventHandlers: cache.handlers
	}
)