import { CmdCall, Cmd, Ctx, sendMessage } from '../../mod.ts'

export const ip: Cmd = {
	aliases: ['ip'],
	clearance: 1,
	execute: async(ctx: Ctx, cmdCtx: CmdCall) => {
		const rawData: Response = await fetch('https://api.ipify.org?format=json')
		const data = await rawData.json()
		if (!data.ip)
			throw new Error('Cannot resolve IP adress')

		sendMessage(cmdCtx.channel, `\`${data.ip}\``)
	}
}