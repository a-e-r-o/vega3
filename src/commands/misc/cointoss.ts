import { Cmd, CmdCall, sendMessage, v } from '../../mod.ts'

export const cointoss: Cmd = {
	tags: 0,
	aliases: ['pf', 'flip', 'cointoss', 'coinflip', 'pileface'],
	execute: (call: CmdCall) => {
		sendMessage(v, call.channel, {content: Math.random() < 0.5 ? 'Tails' : 'Heads'})
	}
}