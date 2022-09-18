import { sendMessage, Cmd, CmdCall, } from "../mod.ts"

export const shutdown: Cmd = {
	aliases: ['shutdown', 'exit(0)'],
	clearance: 1,
	execute: async(call: CmdCall) => {
		await sendMessage(call.channel, ':warning: `Emergency shutdown engaged` :warning:')
		Deno.exit(0)
	}
}