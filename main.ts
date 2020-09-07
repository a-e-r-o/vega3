// - Libs -
import * as Discord from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'
import { Intents, sendMessage } from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'
// - Types -
import { Config } from './src/types/configSchema.ts';
import { Command } from './src/types/command.ts'
import { Call } from './src/types/call.ts'
import { loadFiles, loadConfig } from './src/managers/loader.ts'

// -- Context --

export const cache = {
	config: new Config(),
	commands: new Array<Command>(),
	managers: new Array<Object>()
};

await loadFiles();
await loadConfig();

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
			reactionAdd: () => { },
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