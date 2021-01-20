// Types
import { Message, sendMessage } from '../../deps.ts'
import { Call } from '../class/class.ts'
// cache
import { cache } from '../../main.ts'

cache.commands.set('ip', {
	aliases: ['ip'],
	clearance: 1,
	main: async(call: Call) => {
		let resMsg = 'Cannot resolve IPv4'

		try {
			const data = await (await fetch('https://api.ipify.org?format=json')).json()
			resMsg = data['ip']
			
			//resMsg = await res.json()
		} catch (error) {
			resMsg = 'API error'
		}

		// Call : {command, arguments}
		sendMessage(call.msg.channelID, resMsg)
	}
})