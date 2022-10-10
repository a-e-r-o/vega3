import { ready, commandList, loadConfig, startBot, Intents, ensureDirSync, msgCreate, guildMemberAdd, HoroService, Cmd, clearDir, consts, PrefsService } from './src/mod.ts'

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
	horoService: new HoroService(),
	prefsService: new PrefsService(),
}

console.log('Initialization...')

// Connect to Discord
startBot(
	{
		token: ctx.config.token,
		intents: [Intents.Guilds, Intents.GuildMessages, Intents.DirectMessages, Intents.GuildMembers],
		eventHandlers: {
			ready: () => { ready() },
			messageCreate: (msg ) => { msgCreate(msg) },
			guildMemberAdd: (guild, member) => { guildMemberAdd(guild, member) }
		}
	}
)