import { Embed, Cmd, CmdCall, eightBallSentencesFr, randInt } from '../mod.ts'

export const heightball: Cmd = {
	aliases: ['8ball', 'mball', 'magicball', 'boulemagique'],
	execute: (call: CmdCall) => {
		
		const options = eightBallSentencesFr;
		const desc = call.args.join(' ')

		// select at random among the args
		const selectedItem: string = options[randInt(options.length-1)]
		
		// Create embed
		const res: Embed = {};

		// If description set, it's used as title
		res.title = desc ? desc : undefined
		res.description = ':8ball:  ' + selectedItem

		return res
	}
}