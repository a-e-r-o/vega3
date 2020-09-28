// - Libs -
import * as Discord from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'
import { Intents, sendMessage } from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'
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

// -- Main --
console.log('starting...');

Discord.createClient(
	{
		token: cache.config.token,
		intents: [Intents.GUILDS, Intents.GUILD_MESSAGES],
		eventHandlers: cache.handlers
	}
)