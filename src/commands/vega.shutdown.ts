import { Cmd, CmdCall, } from '../mod.ts'

export const shutdown: Cmd = {
	aliases: ['shutdown', 'exit(0)'],
	clearance: 1,
	execute: (call: CmdCall) => {
		setTimeout(() => {
			Deno.exit(0)
		}, 5000)
		throw ':warning: `Emergency shutdown engaged. VEGA will self-terminate in 5 seconds.`'
	}
}