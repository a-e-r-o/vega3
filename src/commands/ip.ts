// Types
import { Message, sendMessage } from '../../deps.ts'
import { CmdContext } from '../class/class.ts'
// cache
import { botCache } from '../../main.ts'

botCache.commands.set('ip', {
	aliases: ['ip'],
	clearance: 1,
	main: async(cmdCtx: CmdContext) => {
		let resMsg: string;

		try {
			const rawData: Response = await fetch('https://api.ipify.org?format=json');			
			const data: Record<string, unknown> = await rawData.json()
			resMsg = `\`${data.ip}\``
		} catch (error) {
			resMsg = 'Cannot resolve IP adress : API error'
		}

		sendMessage(cmdCtx.msg.channelID, resMsg)
	}
})