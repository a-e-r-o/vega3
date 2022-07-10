import { Ctx, ready, commandList, loadConfig, startBot, Intents, ensureDir, msgCreate, guildMemberAdd, SocialCreditsService, HoroService } from '../src/mod.ts'

// Init local database folder
await ensureDir('./database')

// Init context
const ctx: Ctx = {
	upTime: new Date(),
	config: await loadConfig(),
	commands: commandList,
	services: {
		socialCreditsSevice: new SocialCreditsService(),
		horoService: new HoroService()
	},
	handlers: {
		ready: ()=>{
			ready(ctx)
		},
		messageCreate: (msg)=>{
			msgCreate(ctx, msg)
		},
		guildMemberAdd: (guild, member)=> {
			guildMemberAdd(ctx, guild, member);
		},
		//guildMemberRemove: (guild, user, member)=> {
		//	guildMemberRemove(ctx, guild, user, member);
		//}
	}
}

console.log('Intializing tests...')

// Connect to Discord
startBot(
	{
		token: ctx.config.token,
		intents: [Intents.Guilds, Intents.GuildMessages, Intents.DirectMessages, Intents.GuildMembers],
		eventHandlers: ctx.handlers
	}
)