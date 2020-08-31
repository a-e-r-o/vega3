// Types
import { Message, sendMessage } from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'
import { Command } from '../types/command.ts'
import { Call } from '../types/call.ts'
// Context
import { context } from '../../main.ts'

export let test: Command = {
	aliases: ['test', 'tst'],
	permission: [0],
	main: (message: Message, call: Call) => {
		// Call : {command, arguments}
		console.log('yee')
		sendMessage(message.channel, 'hello there !')
	}
}