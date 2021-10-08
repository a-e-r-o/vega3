import { DiscordenoMessage, sendMessage } from '../../deps.ts';
import { Ctx, CmdCall, Cmd } from '../../types/mod.ts';
import { parseCommand } from '../../helpers/mod.ts'

export async function msgCreate(ctx: Ctx, msg: DiscordenoMessage){
	// If message is from a bot, of if it's not a command, do nothing
	if (msg.isBot || !msg.content?.match(RegExp('^'+ctx.cfg.prefix, 'gi')))
		return

	const cmdCall: CmdCall = parseCommand(msg, ctx.cfg.prefix)
	const foundCmd: Cmd | undefined = ctx.cmd.find(x => x.aliases.includes(cmdCall.cmd))
	
	// If command not cound, do nothing
	if (!foundCmd)
		return

	// TODO : implement a clearance system
	//if (command.clearance > 0)
	//	return sendMessage(cmdCall.channel, 'Insufficient user clearance level')

	try {
		await foundCmd.execute(ctx, cmdCall)
	} catch (e){
		// TODO : rework this part
		// TODO : decide whether perm should be handled in this file or in each command file

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