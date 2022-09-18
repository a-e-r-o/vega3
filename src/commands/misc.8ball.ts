import { Embed, Cmd, CmdCall, eightBallSentencesFr } from '../mod.ts'

export const heightball: Cmd = {
	aliases: ['8ball', 'mball', 'magicball', 'boulemagique'],
	execute: (call: CmdCall) => {
		
		const options = eightBallSentencesFr;
		const desc = call.args.join(' ')

		// select at random among the args
		const selectedItem: string = options[Math.floor(Math.random() * options.length)]
		
		// Create embed
		const res: Embed = {};

		// If description set, it's used as title
		res.title = desc ? desc : undefined
		res.description = ':8ball:  ' + selectedItem

		return res
	}
}