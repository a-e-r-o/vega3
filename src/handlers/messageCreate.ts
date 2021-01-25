// Libs
import { sendMessage, Message } from '../../deps.ts'
// cache
import { botCache } from '../../main.ts'
import { CmdContext } from '../class/class.ts'
import { Command } from '../types/types.ts'

botCache.handlers.messageCreate = (message: Message) => {
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
	if (command.clearance > 0 && !botCache.config.botAdmins.includes(cmdCtx.msg.author.id)){
		sendMessage(cmdCtx.msg.channelID, 'Insufficient user clearance level')
		return
	}

	try {
		command.main(cmdCtx)
	} catch (e){
		console.log(
			`- Error executing command : ${cmdCtx.cmd} with args [${cmdCtx.args.join(',')}]\n`,
			` └ ${e.message}`
		)
	}
}