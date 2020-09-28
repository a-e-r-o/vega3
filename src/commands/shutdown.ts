// Types
import { Message, sendMessage } from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'
import { Call } from '../class/class.ts'
// cache
import { cache } from '../../main.ts'

cache.commands.set('shutdown', {
	aliases: ['shutdown', 'exit(0)'],
	permission: [0],
	main: async(call: Call) => {
		await sendMessage(call.msg.channel, '/!\\ Emergency shutdown engaged /!\\');
		Deno.exit(0);
	}
})