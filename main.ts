// - deps -
import { startBot, Intents } from './deps.ts'
// - Types -
import { Config } from './src/class/class.ts'
import { BotCache, Command } from './src/types/types.ts'
import { loadCommands, loadConfig, loadHandlers } from './src/managers/managers.ts'

// -- Context --

export const botCache: BotCache = {
	config: new Config(),
	commands: new Map<string, Command>(),
	managers: [],
	handlers: {},
	startTime: new Date(),
}


loadConfig()
loadCommands()
loadHandlers()

console.log('starting...')

startBot(
	{
		token: botCache.config.token,
		intents: [Intents.GUILDS, Intents.GUILD_MESSAGES, Intents.DIRECT_MESSAGES],
		eventHandlers: botCache.handlers
	}
)