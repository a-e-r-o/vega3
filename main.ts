import { ready, commandList, loadConfig, startBot, Intents, ensureDirSync, msgCreate, guildMemberAdd, ReminderService, Cmd, clearDir, consts, PrefsService, createEventHandlers, createBot, enableHelpersPlugin, enableCachePlugin, enableCacheSweepers, enablePermissionsPlugin, BotWithCache } from './src/mod.ts'

// Init local database
ensureDirSync(consts.dbDir)

// Ensure and clears temp folder
ensureDirSync(consts.tmpDir)
await clearDir(consts.tmpDir)

// Init globals
export const ctx = {
	upTime: new Date(),
	config: await loadConfig(),
	commands: Object.values(commandList) as Cmd[],
	prefsService: new PrefsService(),
	reminderService: new ReminderService()
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
enableHelpersPlugin(v);
enableCachePlugin(v);
enableCacheSweepers(v);
enablePermissionsPlugin(v);

// Start bot
startBot(v)