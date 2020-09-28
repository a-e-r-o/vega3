// Types
import { Message, sendMessage } from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'
import { Call } from '../class/class.ts'
// cache
import { cache } from '../../main.ts'

cache.commands.set('ip', {
	aliases: ['ip'],
	permission: [0],
	main: async(call: Call) => {
		let resMsg = 'Cannot resolve IPv4';

		try {
			const data = await (await fetch('https://api.ipify.org?format=json')).json();
			resMsg = data['ip'];
			
			//resMsg = await res.json();
		} catch (error) {
			resMsg = 'API error'
		}

		// Call : {command, arguments}
		sendMessage(call.msg.channel, resMsg);
	}
})