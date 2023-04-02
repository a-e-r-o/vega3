import { Command, CommandCall, randInt, CommandTags } from '../../mod.ts'

export const dummy: Command = {
	tags: CommandTags.Disabled,
	aliases: ['test', 'tst', 'ping'],
	execute: (call: CommandCall) => {
		return 'pong'
	}
}