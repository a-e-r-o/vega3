import { Ctx, ready, commandList, loadConfig, startBot, Intents, ensureDir, msgCreate, guildMemberAdd, HoroService, Cmd } from './src/mod.ts'

// Init local database folder
await ensureDir('./database')

// Init context
export const ctx: Ctx = {
	upTime: new Date(),
	config: await loadConfig(),
	commands: Object.values(commandList) as Cmd[],
	services: {
		horoService: new HoroService()
	},
	handlers: {
		ready: ()=>{
			ready()
		},
		messageCreate: (msg)=>{
			msgCreate(msg)
		},
		guildMemberAdd: (guild, member)=> {
			guildMemberAdd(guild, member);
		},
		//guildMemberRemove: (guild, user, member)=> {
		//	guildMemberRemove(ctx, guild, user, member);
		//}
	}
}

console.log('Initialization...')

// Connect to Discord
startBot(
	{
		token: ctx.config.token,
		intents: [Intents.Guilds, Intents.GuildMessages, Intents.DirectMessages, Intents.GuildMembers],
		eventHandlers: ctx.handlers
	}
)