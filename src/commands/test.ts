// Types
import { Message, sendMessage } from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'
import { Command } from '../types/command.ts'
import { Call } from '../types/call.ts'
// Context
import { context } from '../../main.ts'

context.commands.push({
	aliases: ['test', 'tst', 'ping'],
	permission: [0],
	main: (message: Message, call: Object) => {
		// Call : {command, arguments}
		sendMessage(message.channel, 'hello there !')
	}
})