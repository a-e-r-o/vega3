// - Libs -
import * as Discord from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'
import { Intents, sendMessage } from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'
// - Types -
import { config } from './config.ts'
import { Command } from './src/types/command.ts'
import { Call } from './src/types/call.ts'
import { loadFiles } from './src/managers/loader.ts'

// -- Context --

export const context = {
	commands: new Array<Command>(),
	managers: new Array<Object>()
};

await loadFiles();

// -- Main --
console.log('starting...');

Discord.createClient(
	{
		token: config.token,
		intents: [Intents.GUILDS, Intents.GUILD_MESSAGES],
		eventHandlers: {
			ready: () => {
				console.log('ready')
			},
			reactionAdd: () => { },
			reactionRemove: () => { },
			messageCreate: (msg: Discord.Message) => {
				if (msg.content.match('ping')) {
					console.log('yee')
					let command: Command | undefined = context.commands.find(x => x.aliases.includes('ping'));
					console.log(command)
					if (command){
						command.main(msg, {})
					}
				}
			}
		}
	}
)