import { CmdCall, Cmd, Ctx, botId } from '../../mod.ts'

export const invite: Cmd = {
	aliases: ['invite','inv'],
	clearance: 1,
	execute: (ctx: Ctx, cmdCtx: CmdCall) => {
		return {description: `https://discordapp.com/oauth2/authorize?client_id=${botId}&scope=bot`}
	}
}