import { Cmd, CmdCall, sendMessage, v } from '../../mod.ts'

export const cointoss: Cmd = {
	tags: 0,
	aliases: ['pf', 'flip', 'cointoss', 'coinflip', 'pileface'],
	execute: (call: CmdCall) => {
		sendMessage(v, call.channel, {content: Math.random() < 0.5 ? '<:tail:1014681476517855283>' : '<:head:1014681478778597376>'})
	}
}