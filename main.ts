import { ready, commandList, loadConfig, startBot, Intents, msgCreate, guildMemberAdd, Cmd, GuildSettingsService, createEventHandlers, createBot, enableHelpersPlugin, enableCachePlugin, enableCacheSweepers, enablePermissionsPlugin, BotWithCache, initTemp, initLocalDb } from './src/mod.ts'

initLocalDb()
await initTemp()

// Init globals
export const ctx = {
	upTime: new Date(),
	config: await loadConfig(),
	commands: Object.values(commandList) as Cmd[],
	guildSettingsService: new GuildSettingsService()
}

console.log('Initialization...')

// Create bot object
export const v = createBot({
  token: ctx.config.token,
  intents: Intents.Guilds + Intents.GuildMessages + Intents.DirectMessages + Intents.GuildMembers + Intents.MessageContent,
  events: createEventHandlers({
		ready: () => { ready() },
		messageCreate: (bot, msg) => { msgCreate(msg) },
		guildMemberAdd: (bot, member, user) => { guildMemberAdd(member, user) }
	}),
}) as BotWithCache

// Add plugins
enableHelpersPlugin(v)
enableCachePlugin(v)
enableCacheSweepers(v)
enablePermissionsPlugin(v)

// Start bot
startBot(v)