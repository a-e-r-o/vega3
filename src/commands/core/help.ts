import { Cmd, CmdCall, CmdTags } from '../../mod.ts'

export const help: Cmd = {
	tags: CmdTags.Disabled,
	aliases: ['help', 'h'],
	execute: (call: CmdCall) => {
	}
}