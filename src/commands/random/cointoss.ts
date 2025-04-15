import { Command, CommandCall } from '../../mod.ts'

export const cointoss: Command = {
	tags: 0,
	aliases: ['cointoss' ,'pf', 'flip', 'coinflip', 'pileface'],
	execute: (call: CommandCall) => {
		call.msg.channel.send({content: Math.random() < 0.5 ? 'Tails' : 'Heads'})
	}
}