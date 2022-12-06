import { Cmd, CmdCall, randInt, CmdTags } from '../../mod.ts'

export const dummy: Cmd = {
	tags: CmdTags.Disabled,
	aliases: ['test', 'tst', 'ping'],
	execute: (call: CmdCall) => {
		return 'pong'
	}
}