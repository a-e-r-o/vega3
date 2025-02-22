import { Command, CommandCall, parseDesc, randInt } from '../../mod.ts'
import { Embed } from '../../../deps.ts'

export const randint: Command = {
	tags: 0,
	aliases: ['randint', 'dice', 'dé', 'randominteger', 'randomint'],
	execute: (call: CommandCall) => {
		const desc = parseDesc(call.args)

		// Join remaining options to reconstruct the original message, and split options with the semicolon
		const options = call.args.join(' ').split(';').filter(x => x !== '')
		const intOptions: number[] = []
		options.forEach(x => {
			const parsedOption = parseInt(x)
			if (isNaN(parsedOption))
				throw 'Error : incorect argument, please provide only integer numbers'
			intOptions.push(parsedOption)
		})

		let min = 1
		let max = 6
		
		// If there is only 1 arg, return random between 0-arg
		if (intOptions.length == 1 && intOptions[0] > 0) {
			min = 0
			max = intOptions[0]
		}
		// if there are two args / normal behaviour
		else if (intOptions.length == 2) {
			min = intOptions[0]
			max = intOptions[1]
		}
		// if there are too many args, abort
		else if (intOptions.length > 2) {
			throw 'Error : please provide a max of two number'
		}
		
		// if min is superior or equal to max invert them
		if (min >= max) {
			[min, max] = [max, min]
		}

		// random int within the range
		const result = randInt(max, min)
		
		// Create embed
		const res = new Embed()

		// If description set, it's used as title
		res.title = desc ? desc : undefined
		res.description = ':game_die: ' + result

		return res
	}
}