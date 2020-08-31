import * as Discord from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'
import { Intents, sendMessage } from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'
import { config } from './config.ts'
import { Command } from './src/types/command.ts'

export let context = {
	commands: new Array<Command>()
}

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
					sendMessage(msg.channel, 'pong')
				}
			}
		}
	}
)