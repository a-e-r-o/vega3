import { ready, loadConfig, msgCreate, GuildSettingsService, initTemp, initLocalDb, Command, commandList } from './src/mod.ts'
import { CommandClient } from "./deps.ts";


console.log('Initialization...')

// Ensuring local database and temp folders
initLocalDb()
await initTemp()

export const CONTEXT = {
	config: await loadConfig(),
	guildSettingsService: new GuildSettingsService(),
	commands: Object.values(commandList) as Command[]
}

// -- Harmony bot
export const BOT = new CommandClient({
  prefix: ['yoda'],
  caseSensitive: false,
  intents: [
    'GUILDS',
    'DIRECT_MESSAGES',
    'GUILD_MESSAGES',
		'GUILD_MEMBERS',
		'MESSAGE_CONTENT'
  ],
	token: CONTEXT.config.token
  // token: optionally specify, otherwise DISCORD_TOKEN from env is used
})

// Listen for event when client is ready (Identified through gateway / Resumed)
BOT.on('ready', () => {
  ready()
})
BOT.on('messageCreate', (message) => {
	msgCreate(message)
})

//BOT.commands.add(PingCommand)

// Launch
BOT.connect()





// -- Discordeno bot

/*
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
startBot(v)*/