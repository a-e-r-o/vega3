import { Cmd, CmdCall } from '../mod.ts'

export const cointoss: Cmd = {
	aliases: ['pf', 'flip', 'cointoss', 'coinflip', 'pileface'],
	execute: (call: CmdCall) => {
		return Math.random() < 0.5 ? '<:tail:1014681476517855283>' : '<:head:1014681478778597376>'
	}
}