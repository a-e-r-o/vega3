import { sendMessage } from '../../deps.ts'
import { Ctx, Cmd, CmdCall } from '../../types/mod.ts'

export const help: Cmd = {
	disabled: true,
	aliases: ['help', 'h'],
	execute: (ctx: Ctx, cmdCtx: CmdCall) => {
		sendMessage(cmdCtx.channel, '``')
	}
}