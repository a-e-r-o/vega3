import { CmdCall, Cmd, DiscordenoMessage, sendMessage, formatErr, formatWarn, parseCall, formatBasic } from '../mod.ts'
import { ctx } from '../../main.ts'

export async function msgCreate(msg: DiscordenoMessage){
	// If message is from a bot
	if (msg.isBot)
		return
	
	// If msg doesn't start with prefix, ignore
	for(let j = 0; j < ctx.config.prefix.length; j++){
		if (msg.content?.[j].toLowerCase() != ctx.config.prefix[j].toLowerCase())
			return
	}

	const call: CmdCall = parseCall(msg, ctx.config.prefix)
	const foundCmd: Cmd | undefined = ctx.commands.find(x => x.aliases.includes(call.cmd))

	// Check if command found
	if (!foundCmd)
		return
	// Check if command disabled
	if (foundCmd.disabled)
		return sendMessage(call.channel, {embeds: [formatWarn('I am sorry to inform you this command is not available at this time.')]})
	// Check clearance
	if (foundCmd.clearance && !ctx.config.clearances.find(x => x.userId == call.msg.authorId.toString()))
		return sendMessage(call.channel, {embeds: [formatWarn('I am sorry to inform you do not have proper clearance to execute this command.')]})

	try {
		// Execute Command
		const feedback = await foundCmd.execute(call)
		// If return is just a string
		if (typeof feedback === 'string')
			return sendMessage(call.channel, {embeds: [formatBasic(feedback)]})
		// If return is not a string and not undefined, it's an embed
		if (typeof feedback !== 'undefined')
			return sendMessage(call.channel, {embeds: [feedback]})
	} catch (e){
		// If the object caught is an error and not a string, then it is critical
		if (e instanceof Error){
			console.log(
				`Error executing command : ${call.cmd} with args [${call.args.join(',')}]\n`,
				`└ ${e.message}`
			)
			return sendMessage(call.channel, {embeds: [formatErr(`[Critical error]\n${e.message}`)]})
		}

		return sendMessage(call.channel, {embeds: [formatWarn(e)]})
	}
}