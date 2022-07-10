import { sendMessage, Cmd, CmdCall, Ctx } from "../mod.ts"

export const shutdown: Cmd = {
	aliases: ['shutdown', 'exit(0)'],
	clearance: 1,
	execute: async(ctx: Ctx, cmdCtx: CmdCall) => {
		await sendMessage(cmdCtx.channel, ':warning: `Emergency shutdown engaged` :warning:')
		Deno.exit(0)
	}
}