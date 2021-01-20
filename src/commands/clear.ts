// Types
import { sendMessage, getMessages, deleteMessages, getMember, Member, memberIDHasPermission } from '../../deps.ts'
import { Call } from '../class/class.ts'
// cache
import { cache } from '../../main.ts'

cache.commands.set('clear', {
	aliases: ['clear', 'cls', 'clean'],
	clearance: 0,
	main: async(call: Call) => {
		// if member has permission to manage messages
		if (
			!await memberIDHasPermission(
				call.msg.author.id,
				call.msg.guildID,
				["MANAGE_MESSAGES"]
			)
		) {
			sendMessage(
				call.msg.channelID,
				'Messages deletion failed *(User missing permissions)*'
			)
			return
		}

		let msgNumber: number = parseInt(call.args[0])
		// Check if not NaN and more than 0
		if (!(msgNumber > 0))
			// Default value is 5
			msgNumber = 5

		// +1 to include the message that triggered the command
		msgNumber += 1

		while (msgNumber > 0) {
			try {
	      const messagesToDelete = await getMessages(
	        call.msg.channelID,
	        { limit: 100 },
	      )
	      if (!messagesToDelete) return

	      await deleteMessages(
	        call.msg.channelID,
	        messagesToDelete.slice(0, msgNumber).map((m) => m.id),
				)
				msgNumber -= messagesToDelete.length
	    } catch (error) {
				sendMessage(
					call.msg.channelID,
	        'Could not delete message',
				)
				return 
			}
		}
	}
})