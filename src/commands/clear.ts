import { getMessages, memberIDHasPermission } from '../../deps.ts'
import { CmdContext, Command } from '../types/common.ts'
import { deleteMsgs } from '../helpers/discord.ts'
import { botCache } from '../../cache.ts'

export const cmd: Command = {
	aliases: ['clear', 'cls', 'clean'],
	clearance: 0,
	main: async (cmdCtx: CmdContext) => {
		// if member has permission to manage messages
		const canDelMsgPerm = await memberIDHasPermission(
			cmdCtx.msg.author.id,
			cmdCtx.msg.guildID,
			["MANAGE_MESSAGES"]
		)

		// need permission to manage messages, but me, I own the bot I don't need no permission. gang gang
		if (!canDelMsgPerm && !botCache.config.botAdmins.includes(cmdCtx.msg.author.id))
			throw 'Messages deletion failed *(User missing permissions)*'

		let msgNumber: number = parseInt(cmdCtx.args[0])
		// Check if not NaN and more than 0
		if (!(msgNumber > 0))
			// Default value is 5
			msgNumber = 5
		// +1 to include the message that triggered the command
		msgNumber += 1

		if (msgNumber > 1000)
			throw 'This command is limited to 1000 messages at a time'

		do {
			const limit = msgNumber > 100 ? 100 : msgNumber;
			try {
				const messages = await getMessages(cmdCtx.msg.channelID, { limit: limit })
				
				if (!messages || messages.length == 0)
					return

				msgNumber -= limit
				
				await deleteMsgs(messages, cmdCtx.msg.channelID)
			} catch (error) {
				throw 'Could not delete message (no permission, or no message to delete)'
			}
		}	while (msgNumber > 0)
	}
}