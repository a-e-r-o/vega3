// - deps -
import { startBot, Intents } from './deps.ts'
// - Types -
import { loadCommands, loadConfig, loadHandlers } from './src/helpers/loader.ts'
import { botCache } from './cache.ts'

// -- Context --

botCache.config = loadConfig()
botCache.commands = await loadCommands()
botCache.handlers = await loadHandlers()

console.log('starting...')

startBot(
	{
		token: botCache.config.token,
		intents: [Intents.Guilds, Intents.GuildMessages, Intents.DirectMessages],
		eventHandlers: botCache.handlers
	}
)