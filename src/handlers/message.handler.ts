// Types
import { Message, sendMessage } from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'
import { Command, Call } from '../types/types.ts'
// cache
import { cache } from '../../main.ts'

/*
cache.handlers.message({
	aliases: ['test', 'tst', 'ping'],
	permission: [0],
	main: (message: Message, call: Object) => {
		// Call : {command, arguments}
		sendMessage(message.channel, 'hello there !')
	}
})
*/