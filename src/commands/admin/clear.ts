import { getMessages, hasGuildPermissions } from '../../deps.ts'
import { CmdCall, Cmd, Ctx } from '../../types/mod.ts'
import { deleteMsgs } from '../../helpers/mod.ts'

export const clear: Cmd = {
	aliases: ['clear', 'cls', 'clean'],
	execute: async (ctx: Ctx, cmdCtx: CmdCall) => {
		// if member has permission to manage messages
		const canDelMsgPerm = await hasGuildPermissions(
			cmdCtx.msg.guildId,
			cmdCtx.msg.authorId,
			["MANAGE_MESSAGES"]
		)
		

		if (!canDelMsgPerm)
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
			const limit = msgNumber > 100 ? 100 : msgNumber
			try {
				const messages = await getMessages(cmdCtx.channel, { limit: limit })
				
				if (!messages || messages.length == 0)
					return

				msgNumber -= limit
				
				await deleteMsgs(messages, cmdCtx.channel)
			} catch (_error) {
				throw 'Could not delete messages *(messages too old, vega missing permission, or no messages found)*'
			}
		}	while (msgNumber > 0)
	}
}