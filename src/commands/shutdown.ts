// Types
import { Message, sendMessage } from '../../deps.ts'
import { Call } from '../class/class.ts'
// cache
import { cache } from '../../main.ts'

cache.commands.set('shutdown', {
	aliases: ['shutdown', 'exit(0)'],
	clearance: 1,
	main: async(call: Call) => {
		await sendMessage(call.msg.channelID, '/!\\ Emergency shutdown engaged /!\\');
		Deno.exit(0);
	}
})