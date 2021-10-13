import { startBot, Intents, DiscordenoMessage } from './src/deps.ts'
import { loadConfig } from './src/helpers/vega/config.ts'
import { Ctx } from "./src/types/mod.ts";
import { ready, msgCreate } from './src/handlers/mod.ts'
import { cmdList } from './src/commands/mod.ts' 
import { DongManager, HoroManager } from "./src/managers/mod.ts";

// Init context
const ctx: Ctx = {
	upTime: new Date(),
	cfg: loadConfig(),
	cmd: cmdList,
	hdr: {
		ready: ()=>{
			ready(ctx)
		},
		messageCreate: (msg: DiscordenoMessage)=>{
			msgCreate(ctx, msg)
		}
	},
	mng: {
		dong: new DongManager(),
		horoscope: new HoroManager()
	}
}

console.log('Initialization...')

// Connect to Discord
startBot(
	{
		token: ctx.cfg.token,
		intents: [Intents.Guilds, Intents.GuildMessages, Intents.DirectMessages],
		eventHandlers: ctx.hdr
	}
)