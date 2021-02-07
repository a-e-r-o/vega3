import { getMessages, Message, memberIDHasPermission } from '../../deps.ts'
import { isDiscordId, deleteMsgs } from '../helpers/discord.ts'
import { CmdContext, Command } from '../types/common.ts'
import { botCache } from '../../cache.ts'

export const cmd: Command = {
	aliases: ['order66', '66'],
	clearance: 0,
	main: async(cmdCtx: CmdContext) => {
		const canDelMsgPerm = await memberIDHasPermission(
			cmdCtx.msg.author.id,
			cmdCtx.msg.guildID,
			["MANAGE_MESSAGES"]
		)
		
		// need permission to manage messages, but me, I own the bot I don't need no permission. gang gang
		if (!canDelMsgPerm && !botCache.config.botAdmins.includes(cmdCtx.msg.author.id))
			throw 'Messages deletion failed *(User missing permissions)*'

		if (!isDiscordId(cmdCtx.args[0]) || cmdCtx.args.length > 1)
			throw 'please provide a single, correct, user ID'

		const targetId = cmdCtx.args[0]
		let lastMessage: Message | undefined

		do  {
			try {
				let messages: Message[] | undefined

				// fetch the first message batch, or the next one
				if (lastMessage) {					
					messages = await getMessages(cmdCtx.msg.channelID, { limit: 100, before: lastMessage.id })
				} else {
					messages = await getMessages(cmdCtx.msg.channelID, { limit: 100 })
				}

				// if no msg could be fetched, abord all because it means we reached the end
				if (!messages || messages.length == 1)
					break

				// add lastmessage from precedent iteratrion or else it will be missed
				if (lastMessage)
					messages.unshift(lastMessage)
					
				// retreive last msg to keep track
				lastMessage = messages.pop()

				// filter msg to delete only msg by the targeted user
				messages = messages.filter(x => x.author.id === targetId)

				if (messages.length == 0)
					continue
				
				// delete messages if there are any left after filtering them
				await deleteMsgs(messages, cmdCtx.msg.channelID)
			} catch (e) {
				throw new Error('Could not delete message')
			}
		} while (lastMessage)
	}
}