import { sendMessage } from '../../deps.ts'
import { CmdContext, Command } from '../types/common.ts'

export const cmd: Command = {
	aliases: ['rand', 'random', 'choose'],
	clearance: 0,
	main: (cmdCtx: CmdContext) => {
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

		// the remaining args after desc parsing are the options
		const options: string[] = cmdCtx.args
		
		// if there are no options, abort
		if (options.length < 1)
			throw 'Error : not enough options provided'

		// select at random among the args
		const selectedItem: string = '└> ' + options[Math.floor(Math.random() * options.length)]

		const resMsg = desc ? '- ' + desc + '\n' + selectedItem : selectedItem
		
		sendMessage(cmdCtx.channel, resMsg)
	}
}