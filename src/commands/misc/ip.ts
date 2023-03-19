import { CmdCall, Cmd, sendMessage, CmdTags } from '../../mod.ts'

export const ip: Cmd = {
	tags: CmdTags.BotAdminRequired,
	aliases: ['ip'],
	execute: async(call: CmdCall) => {
		const rawData: Response = await fetch('https://api.ipify.org?format=json')
		const data = await rawData.json()
		if (!data.ip)
			throw 'Cannot resolve IP adress'

		return `\`${data.ip}\``
	}
}