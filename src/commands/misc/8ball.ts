import { Embed, Cmd, CmdCall, res8bFr, randInt } from '../../mod.ts'

export const heightball: Cmd = {
	tags: 0,
	aliases: ['8ball', 'mball', 'magicball', 'boulemagique'],
	execute: (call: CmdCall) => {
		
		const imperative = call.msg.content.match(/\?\?/gim) !== null
		const desc = call.args.join(' ')
		let options = [...res8bFr.yes,  ...res8bFr.no]

		if (!imperative)
			options = [...options, ...res8bFr.maybe, ...res8bFr.likely, ...res8bFr.unlikely,]
		
		// select at random among the args
		const selectedItem: string = options[randInt(options.length-1)]
		
		// Create embed
		const res: Embed = {}

		// If description set, it's used as title
		res.title = desc ? desc : undefined
		res.description = ':8ball:  ' + selectedItem

		return res
	}
}