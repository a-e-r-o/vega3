import { Command, CommandCall, sendMessage, v } from '../../mod.ts'

export const cointoss: Command = {
	tags: 0,
	aliases: ['cointoss' ,'pf', 'flip', 'coinflip', 'pileface'],
	execute: (call: CommandCall) => {
		sendMessage(v, call.channel, {content: Math.random() < 0.5 ? 'Tails' : 'Heads'})
	}
}