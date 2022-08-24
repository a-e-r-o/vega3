import { Embed, Cmd, CmdCall } from '../mod.ts'

export const random: Cmd = {
	aliases: ['rand', 'random', 'choose'],
	execute: (cmdCtx: CmdCall) => {
		let desc: string | undefined

		// If first char of an arg is a dash, consider the first beginning of the description
		const descIndex: number = cmdCtx.args.findIndex(x => x.match(/^--/))

		// If there is a desc, it is the one beginning with a dash and all the ones after it
		if (descIndex >= 0) {
			// remove the separator from the arg to have a clean desc
			if (cmdCtx.args[descIndex] === '--') {
				// if it's only the separator by itself remove the arg altogether
				cmdCtx.args.splice(descIndex, 1)
			} else {
				// else, remove the separator from the arg
				cmdCtx.args[descIndex] = cmdCtx.args[descIndex].replace(/^--/, '')
			}

			// join all args following the one with the separator
			desc = 
				cmdCtx
					.args
					.splice(descIndex, cmdCtx.args.length - descIndex)
					.join(' ')
		}

		// Join remaining options to reconstruct the original message, and split options with the semicolon
		const options = cmdCtx.args.join(' ').split(';').filter(x => x !== '')
		
		// if there are no options, abort
		if (options.length < 1)
			throw 'Error : not enough options provided'

		// select at random among the args
		const selectedItem: string = options[Math.floor(Math.random() * options.length)]
		
		// Create embed
		const res: Embed = {};

		// If description set, it's used as title
		res.title = desc ? desc : undefined
		res.description = ':game_die: ' + selectedItem

		return res
	}
}