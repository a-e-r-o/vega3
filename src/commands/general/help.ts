import { sendMessage } from '../../deps.ts'
import { Ctx, Cmd, CmdCall } from '../../types/mod.ts'

export const help: Cmd = {
	aliases: ['help', 'h'],
	clearance: 0,
	execute: (ctx: Ctx, cmdCtx: CmdCall) => {
		sendMessage(cmdCtx.channel, '`// todo` :smile:')
	}
}