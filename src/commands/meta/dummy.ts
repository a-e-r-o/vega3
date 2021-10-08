import { sendMessage } from '../../deps.ts'
import { Cmd, CmdCall, Ctx } from "../../types/mod.ts"

export const dummy: Cmd = {
	aliases: ['test', 'tst', 'ping'],
	clearance: 0,
	execute: (ctx: Ctx, cmdCtx: CmdCall) => {
		sendMessage(cmdCtx.channel, '`test successful`')
	}
}