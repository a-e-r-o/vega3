import { sendMessage, botId } from '../../deps.ts'
import { CmdCall, Cmd, Ctx } from '../../types/mod.ts'

export const invite: Cmd = {
	aliases: ['invite','inv'],
	clearance: 1,
	execute: (ctx: Ctx, cmdCtx: CmdCall) => {
		sendMessage(cmdCtx.channel, `https://discordapp.com/oauth2/authorize?client_id=${botId}&scope=bot`)
	}
}