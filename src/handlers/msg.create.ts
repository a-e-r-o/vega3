import { CmdCall, Cmd, DiscordenoMessage, sendMessage, error, parseCommand, warning } from '../mod.ts'
import { ctx } from '../../main.ts'

export async function msgCreate(msg: DiscordenoMessage){
	// If message is from a bot
	if (msg.isBot)
		return
	
	// If msg doesn't start with prefix, ignore
	for(let j = 0; j < ctx.config.prefix.length; j++){
		if (msg.content?.[j] != ctx.config.prefix[j])
			return
	}

	const cmdCall: CmdCall = parseCommand(msg, ctx.config.prefix)
	const foundCmd: Cmd | undefined = ctx.commands.find(x => x.aliases.includes(cmdCall.cmd))

	// Check if command found
	if (!foundCmd)
		return

	// Check if command disabled
	if (foundCmd.disabled)
		return sendMessage(cmdCall.channel, warning('I am sorry to inform you this command is not available at this time.'))

	// todo : rework this part to create a actual permissions system
	// Check clearance
	if (foundCmd.clearance && !ctx.config.clearances.find(x => x.userId == cmdCall.msg.authorId.toString()))
		return sendMessage(cmdCall.channel, warning('I am sorry to inform you do not have proper clearance to execute this command.'))

	try {
		// Execute Command
		const feedback = await foundCmd.execute(cmdCall)
		if (feedback != undefined)
			return sendMessage(cmdCall.channel, {embed: feedback})
	} catch (e){
		// If the object caught is an error and not a string, then it is critical
		if (e instanceof Error){
			console.log(
				`Error executing command : ${cmdCall.cmd} with args [${cmdCall.args.join(',')}]\n`,
				`└ ${e.message}`
			)
			return sendMessage(cmdCall.channel, error(`[Critical error]\n${e.message}`))
		}

		return sendMessage(cmdCall.channel, warning(e))
	}
}