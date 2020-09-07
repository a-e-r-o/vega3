// Types
import { Message, sendMessage } from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'
import { Command } from '../types/command.ts'
import { Call } from '../types/call.ts'
// cache
import { cache } from '../../main.ts'

cache.commands.push({
	aliases: ['test', 'tst', 'ping'],
	permission: [0],
	main: (message: Message, call: Object) => {
		// Call : {command, arguments}
		sendMessage(message.channel, 'hello there !')
	}
})