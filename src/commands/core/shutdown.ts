import { Cmd, CmdCall, CmdTags, } from '../../mod.ts'

export const shutdown: Cmd = {
	tags: CmdTags.BotAdminRequired,
	aliases: ['shutdown', 'exit(0)'],
	execute: (call: CmdCall) => {
		setTimeout(() => {
			Deno.exit(0)
		}, 5000)
		return '```fix\nEmergency shutdown engaged. VEGA will self-terminate in 5 seconds.```'
	}
}