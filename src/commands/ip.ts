// Types
import { sendMessage } from '../../deps.ts'
import { CmdContext } from '../class/common.ts'
// cache
import { botCache } from '../../main.ts'

botCache.commands.set('ip', {
	aliases: ['ip'],
	clearance: 1,
	main: async(cmdCtx: CmdContext) => {
		const rawData: Response = await fetch('https://api.ipify.org?format=json')
		const data = await rawData.json()
		if (!data.ip)
			throw new Error('Cannot resolve IP adress')

		sendMessage(cmdCtx.msg.channelID, `\`${data.ip}\``)
	}
})