import { Embed, Cmd, CmdCall } from '../mod.ts'

export const randint: Cmd = {
	aliases: ['randint', 'dice', 'dé', 'randominteger', 'randomint'],
	execute: (call: CmdCall) => {
		let desc: string | undefined

		// If first char of an arg is a dash, consider the first beginning of the description
		const descIndex: number = call.args.findIndex(x => x.match(/^--/))

		// If there is a desc, it is the one beginning with a dash and all the ones after it
		if (descIndex >= 0) {
			// remove the separator from the arg to have a clean desc
			if (call.args[descIndex] === '--') {
				// if it's only the separator by itself remove the arg altogether
				call.args.splice(descIndex, 1)
			} else {
				// else, remove the separator from the arg
				call.args[descIndex] = call.args[descIndex].replace(/^--/, '')
			}

			// join all args following the one with the separator
			desc = 
				call
					.args
					.splice(descIndex, call.args.length - descIndex)
					.join(' ')
		}

		// Join remaining options to reconstruct the original message, and split options with the semicolon
		const options = call.args.join(' ').split(';').filter(x => x !== '')
		const intOptions: number[] = []
		options.forEach(x => {
			const parsedOption = parseInt(x)
			if (isNaN(parsedOption))
				throw 'Error : inccorect argument, please provide only integer numbers'
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
		const selectedItem = Math.floor(Math.random() * (max - min + 1) + min)
		
		// Create embed
		const res: Embed = {};

		// If description set, it's used as title
		res.title = desc ? desc : undefined
		res.description = ':game_die: ' + selectedItem

		return res
	}
}