// - deps -
import { startBot, Intents } from './deps.ts'
// - Types -
import { loadCommands, loadConfig, loadHandlers } from './src/helpers/loaders.ts'
import { botCache } from './cache.ts'

// -- Context --

botCache.config = loadConfig()
botCache.commands = await loadCommands()
botCache.handlers = await loadHandlers()

console.log('starting...')

startBot(
	{
		token: botCache.config.token,
		intents: [Intents.GUILDS, Intents.GUILD_MESSAGES, Intents.DIRECT_MESSAGES],
		eventHandlers: botCache.handlers
	}
)