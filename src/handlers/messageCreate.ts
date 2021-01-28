// Libs
import { sendMessage, Message } from '../../deps.ts'
// cache
import { botCache } from '../../main.ts'
import { CmdContext, ExError } from '../class/common.ts'
import { Command } from '../types/common.ts'

botCache.handlers.messageCreate = async(message: Message) => {
	// if author is a bot
	if (message.author.bot) {
		return
	}
	// if message is not a command, do nothing
	if (!message.content.match(RegExp(botCache.config.prefix, 'gi'))) {
		return
	}

	const cmdCtx: CmdContext = new CmdContext(message, botCache.config.prefix)

	const command: Command | undefined = 
		Array
			.from(botCache.commands.values())
			.find(
				(cmd: Command) => cmd.aliases.includes(cmdCtx.cmd)
			)

	if (!command)
		return

	// temporary solution until implementation of a better clearance system
	if (command.clearance > 0 && !botCache.config.botAdmins.includes(cmdCtx.msg.author.id))
		return sendMessage(cmdCtx.msg.channelID, 'Insufficient user clearance level')

	try {
		await command.main(cmdCtx)
	} catch (e){
		let feedbackMsg = e.message

		// If the error is not an ExError, it means it's a critical error
		if (!(e instanceof ExError)){
			console.log(
				`- Error executing command : ${cmdCtx.cmd} with args [${cmdCtx.args.join(',')}]\n`,
				` └ ${e.message}`
			)
			feedbackMsg = ':warning: Critical error !\n' + feedbackMsg
		}

		sendMessage(cmdCtx.msg.channelID, feedbackMsg)
	}
}