// Types
import { Message, sendMessage } from '../../deps.ts'
import { Call } from '../class/class.ts'
// cache
import { cache } from '../../main.ts'

cache.commands.set('test', {
	aliases: ['test', 'tst', 'ping'],
	permission: [0],
	main: (call: Call) => {
		// Call : {command, arguments}
		sendMessage(call.msg.channelID, 'pong')
	}
})