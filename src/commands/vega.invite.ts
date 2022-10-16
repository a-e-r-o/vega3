import { v, CmdCall, Cmd } from '../mod.ts'

export const invite: Cmd = {
	aliases: ['invite','inv'],
	clearance: 1,
	execute: (call: CmdCall) => {
		return {description: `https://discordapp.com/oauth2/authorize?client_id=${v.applicationId}&scope=bot`}
	}
}