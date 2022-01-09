import { DiscordenoMessage, sendMessage } from '../../deps.ts'
import { Ctx, CmdCall, Cmd } from '../../types/mod.ts'
import { parseCommand } from '../../helpers/mod.ts'

export async function msgCreate(ctx: Ctx, msg: DiscordenoMessage){
	// If message is from a bot, of if it's not a command, do nothing
	if (msg.isBot || !msg.content?.match(RegExp('^'+ctx.config.prefix, 'gi')))
		return

	const cmdCall: CmdCall = parseCommand(msg, ctx.config.prefix)
	const foundCmd: Cmd | undefined = ctx.commands.find(x => x.aliases.includes(cmdCall.cmd))

	// If command not cound, do nothing
	if (!foundCmd)
		return
	
	if (foundCmd.disabled)
		return sendMessage(cmdCall.channel, '`I am sorry to inform you this command is not available at this time.`')

	// todo : rework this part to create a actual permissions system
	if (foundCmd.clearance && !ctx.config.clearances.find(x => x.userId == cmdCall.msg.authorId.toString()))
		return sendMessage(cmdCall.channel, '`I am sorry to inform you do not have proper clearance to execute this command.`')
	
	try {
		await foundCmd.execute(ctx, cmdCall)
	} catch (e){
		// TODO : rework this part to be cleaner
		
		let feedbackMsg = e.message ?? e

		// If the object caught is an error and not a string, then it is critical
		if (e instanceof Error){
			console.log(
				`Error executing command : ${cmdCall.cmd} with args [${cmdCall.args.join(',')}]\n`,
				`└ ${e.message}`
			)
			feedbackMsg = '/!/ Critical error /!/\n' + feedbackMsg
		}

		sendMessage(cmdCall.channel, '`'+feedbackMsg+'`')
	}
}