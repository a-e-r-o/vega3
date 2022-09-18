import { CmdCall, Cmd, sendMessage } from '../mod.ts'

export const ip: Cmd = {
	aliases: ['ip'],
	clearance: 1,
	execute: async(call: CmdCall) => {
		const rawData: Response = await fetch('https://api.ipify.org?format=json')
		const data = await rawData.json()
		if (!data.ip)
			throw new Error('Cannot resolve IP adress')

		sendMessage(call.channel, `\`${data.ip}\``)
	}
}