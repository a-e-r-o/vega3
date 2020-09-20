// Types
import { Message, sendMessage } from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'
import { Call } from '../class/class.ts'
// cache
import { cache } from '../../main.ts'

cache.commands.set('test', {
	aliases: ['test', 'tst', 'ping'],
	permission: [0],
	main: (message: Message, call: Call) => {
		// Call : {command, arguments}
		sendMessage(message.channel, 'pong')
	}
})