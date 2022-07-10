import { sendMessage, Ctx, Cmd, CmdCall } from '../../mod.ts'

export const help: Cmd = {
	disabled: true,
	aliases: ['help', 'h'],
	execute: (ctx: Ctx, cmdCtx: CmdCall) => {
	}
}