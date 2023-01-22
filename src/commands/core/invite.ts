import { v, CmdCall, Cmd, CmdTags } from '../../mod.ts'

export const invite: Cmd = {
	tags: CmdTags.IsAdmin,
	aliases: ['invite','inv'],
	execute: (call: CmdCall) => {
		return {description: `https://discordapp.com/oauth2/authorize?client_id=${v.applicationId}&scope=bot`}
	}
}