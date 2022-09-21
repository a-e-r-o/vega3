import { Embed, Cmd, CmdCall, parseDesc, randInt } from '../mod.ts'

export const random: Cmd = {
	aliases: ['rand', 'random', 'choose'],
	execute: (call: CmdCall) => {
		const desc = parseDesc(call.args);

		// Join remaining options to reconstruct the original message, and split options with the semicolon
		const options = call.args.join(' ').split(';').filter(x => x !== '')
		
		// if there are no options, abort
		if (options.length < 1)
			throw 'Error : not enough options provided'

		// select at random among the args
		const selectedItem: string = options[randInt(options.length-1)]
		
		// Create embed
		const res: Embed = {};

		// If description set, it's used as title
		res.title = desc ? desc : undefined
		res.description = ':game_die: ' + selectedItem

		return res
	}
}