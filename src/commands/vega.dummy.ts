import { getStr, Cmd, CmdCall, randInt } from '../mod.ts'

export const dummy: Cmd = {
	disabled: true,
	aliases: ['test', 'tst', 'ping'],
	execute: (call: CmdCall) => {
		return 'pong'
	}
}