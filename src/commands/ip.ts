import { sendMessage } from '../../deps.ts'
import { CmdContext, Command } from '../types/common.ts'

export const cmd: Command = {
	aliases: ['ip'],
	clearance: 1,
	main: async(cmdCtx: CmdContext) => {
		const rawData: Response = await fetch('https://api.ipify.org?format=json')
		const data = await rawData.json()
		if (!data.ip)
			throw new Error('Cannot resolve IP adress')

		sendMessage(cmdCtx.channel, `\`${data.ip}\``)
	}
}