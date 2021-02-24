// Libs
import { sendMessage, Message } from '../../deps.ts'
// cache
import { botCache } from '../../cache.ts'
import { parseCommand } from "../helpers/miscellaneous.ts"
import { Command, CmdContext } from '../types/common.ts'

export const handler = {event: 'messageCreate', handler: handle}

async function handle (message: Message) {
	// if author is a bot
	if (message.author.bot) {
		return
	}
	// if message is not a command, do nothing
	if (!message.content.match(RegExp('^'+botCache.config.prefix, 'gi')) || message.author.bot)
		return

	const cmdCtx: CmdContext = parseCommand(message, botCache.config.prefix)

	let command: Command | undefined

	for (const cmd of botCache.commands.values()) {
		if (cmd.aliases.includes(cmdCtx.cmd)) {
			command = cmd
			break
		}
	}

	if (!command)
		return sendMessage(cmdCtx.msg.channelID, 'Unkown command')

	// temporary solution until implementation of a better clearance system
	if (command.clearance > 0 && !botCache.config.botAdmins.includes(cmdCtx.msg.author.id))
		return sendMessage(cmdCtx.msg.channelID, 'Insufficient user clearance level')

	try {
		await command.main(cmdCtx)
	} catch (e){
		let feedbackMsg = e.message ?? e

		// If what was thrown was an error, and not a strong, then it's critical
		if (e instanceof Error){
			console.log(
				`- Error executing command : ${cmdCtx.cmd} with args [${cmdCtx.args.join(',')}]\n`,
				` └ ${e.message}`
			)
			feedbackMsg = ':warning: Critical error !\n' + feedbackMsg
		}

		sendMessage(cmdCtx.msg.channelID, feedbackMsg)
	}
}
