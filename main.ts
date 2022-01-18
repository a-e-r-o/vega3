import { startBot, Intents, DiscordenoMessage, ensureDir } from './src/deps.ts'
import { loadConfig } from './src/helpers/vega/config.ts'
import { Ctx } from "./src/types/mod.ts"
import { ready, msgCreate } from './src/handlers/mod.ts'
import { cmdList } from './src/commands/mod.ts' 

// Init local database folder
await ensureDir('./database')

// Init context
const ctx: Ctx = {
	upTime: new Date(),
	config: await loadConfig(),
	commands: cmdList,
	handlers: {
		ready: ()=>{
			ready(ctx)
		},
		messageCreate: (msg: DiscordenoMessage)=>{
			msgCreate(ctx, msg)
		}
	}
}

console.log('Initialization...')

// Connect to Discord
startBot(
	{
		token: ctx.config.token,
		intents: [Intents.Guilds, Intents.GuildMessages, Intents.DirectMessages],
		eventHandlers: ctx.handlers
	}
)