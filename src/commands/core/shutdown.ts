import { Command, CommandCall, CommandTags, } from '../../mod.ts'

export const shutdown: Command = {
	tags: CommandTags.BotAdminRequired,
	aliases: ['shutdown', 'exit(0)'],
	execute: (call: CommandCall) => {
		setTimeout(() => {
			Deno.exit(0)
		}, 5000)
		return '```fix\nEmergency shutdown engaged. VEGA will self-terminate in 5 seconds.```'
	}
}