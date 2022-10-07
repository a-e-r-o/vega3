import { ready, commandList, loadConfig, startBot, Intents, ensureDir, msgCreate, guildMemberAdd, HoroService, Cmd, clearDir, consts } from './src/mod.ts'

// Init local database folder
await ensureDir(consts.dbDir)
// Ensure and clears temp folder
await ensureDir(consts.tmpDir)
await clearDir(consts.tmpDir)

// Init globals
export const ctx = {
	upTime: new Date(),
	config: await loadConfig(),
	commands: Object.values(commandList) as Cmd[],
	horoService: new HoroService(),
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