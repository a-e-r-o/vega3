import * as Di from '../../deps.ts'
import { Message, sendMessage } from '../../deps.ts'
import { Call } from '../class/class.ts'
// cache
import { cache } from '../../main.ts'

cache.commands.set('invite', {
	aliases: ['invite','inv'],
	clearance: 0,
	main: (call: Call) => {
		sendMessage(call.msg.channelID, `https://discordapp.com/oauth2/authorize?client_id=${Di.botID}&scope=bot`)
	}
})