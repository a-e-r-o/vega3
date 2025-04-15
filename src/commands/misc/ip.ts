import { CommandCall, Command, CommandTags } from '../../mod.ts'

export const ip: Command = {
	tags: CommandTags.BotAdminRequired,
	aliases: ['ip'],
	execute: async(call: CommandCall) => {
		const rawData: Response = await fetch('https://api.ipify.org?format=json')
		const data = await rawData.json()
		if (!data.ip)
			throw 'Cannot resolve IP adress'

		return `\`${data.ip}\``
	}
}