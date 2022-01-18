import { sendMessage } from '../../deps.ts'
import { Cmd, CmdCall, Ctx } from "../../types/mod.ts"

export const dummy: Cmd = {
	disabled: true,
	aliases: ['test', 'tst', 'ping'],
	execute: (ctx: Ctx, cmdCtx: CmdCall) => {
		return {description: 'test successful'}
	}
}