import { Embed, Command, CommandCall, randInt } from '../../mod.ts'
import { eightBallResponses } from "../../assets/strings.ts";

export const heightball: Command = {
	tags: 0,
	aliases: ['eightball', '8ball', 'mball', 'magicball', 'boulemagique'],
	execute: execute
}

function execute(call: CommandCall) {
	const resList = eightBallResponses;

	const imperative = call.msg.content.match(/\?\?/gim) !== null
	const desc = call.args.join(' ')
	let options = [...resList.yes,  ...resList.no]

	if (!imperative)
		options = [...options, ...resList.maybe, ...resList.likely, ...resList.unlikely,]
	
	// select at random among the args
	const selectedItem: string = options[randInt(options.length-1)]
	
	// Create embed
	const res: Embed = {}

	// If description set, it's used as title
	res.title = desc ? desc : undefined
	res.description = ':8ball:  ' + selectedItem

	return res
}