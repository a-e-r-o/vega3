// - Libs -
import * as Discord from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'
import { eventHandlers, Intents, sendMessage } from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'
// - Types -
import { Config, Command, Call } from './src/types/types.ts';
import { loadCommands, loadConfig, loadHandlers } from './src/managers/managers.ts'

// -- Context --

export const cache = {
	config: new Config(),
	commands: new Array<Command>(),
	managers: new Array<Object>(),
	handlers: new Object()
};

await loadConfig();
await loadCommands();
await loadHandlers();

// -- Main --
console.log('starting...');

Discord.createClient(
	{
		token: cache.config.token,
		intents: [Intents.GUILDS, Intents.GUILD_MESSAGES],
		eventHandlers: {
			ready: () => {
				console.log('ready')
			},
			reactionAdd: ()=>{},
			reactionRemove: () => { },
			messageCreate: (msg: Discord.Message) => {
				if (msg.content.match('ping')) {
					let command: Command | undefined = cache.commands.find(x => x.aliases.includes('ping'));
					if (command){
						command.main(msg, {})
					}
				}
			}
		}
	}
)