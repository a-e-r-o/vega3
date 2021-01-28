// Types
import { sendMessage, getMessages, deleteMessages, memberIDHasPermission } from '../../deps.ts'
import { CmdContext, ExError } from '../class/common.ts'
// cache
import { botCache } from '../../main.ts'

botCache.commands.set('clear', {
	aliases: ['clear', 'cls', 'clean'],
	clearance: 0,
	main: async (cmdCtx: CmdContext) => {
		// if member has permission to manage messages
		const canDelMsgPerm = await memberIDHasPermission(
			cmdCtx.msg.author.id,
			cmdCtx.msg.guildID,
			["MANAGE_MESSAGES"]
		)
		if (
			// need permission to manage messages, but me, I own the bot I don't need no permission. gang gang
			!canDelMsgPerm && !botCache.config.botAdmins.includes(cmdCtx.msg.author.id)
		) {
			throw new ExError('Messages deletion failed *(User missing permissions)*')
		}

		let msgNumber: number = parseInt(cmdCtx.args[0])
		// Check if not NaN and more than 0
		if (!(msgNumber > 0))
			// Default value is 5
			msgNumber = 5

		// +1 to include the message that triggered the command
		msgNumber += 1

		while (msgNumber > 0) {
			try {
				const messagesToDelete = await getMessages(
					cmdCtx.msg.channelID,
					{ limit: 100 },
				)
				if (!messagesToDelete) return

				await deleteMessages(
					cmdCtx.msg.channelID,
					messagesToDelete.slice(0, msgNumber).map((m) => m.id),
				)
				msgNumber -= messagesToDelete.length
			} catch (error) {
				throw new ExError('Could not delete message (no permission, or no message to delete)')
			}
		}
	}
})