// Types
import { sendMessage, getMessages, deleteMessages, getMember, Member, memberIDHasPermission } from '../../deps.ts'
import { Call } from '../class/class.ts'
// cache
import { cache } from '../../main.ts'

cache.commands.set('clear', {
	aliases: ['clear', 'cls', 'clean'],
	permission: [0],
	main: async(call: Call) => {
		let member: Member | undefined = await getMember(call.msg.guildID, call.msg.author.id);
		if(member !== undefined){
			if (
				!memberIDHasPermission(
					call.msg.author.id,
					member.guildID,
					["MANAGE_MESSAGES"]
				)
			) {
				sendMessage(
					call.msg.channelID,
					'Messages deletion failed : Missing permissions'
				)
				return
			}
		}

		let msgNumber: number = parseInt(call.args[0]);
		// Check if not NaN and more than 0
		if (!(msgNumber > 0))
			// Default value is 5
			msgNumber = 5;

		try {
      const messagesToDelete = await getMessages(
        call.msg.channelID,
        { limit: 100 },
      );
      if (!messagesToDelete) return;

      await deleteMessages(
        call.msg.channelID,
        // + 1 to include the message that triggered the command
        messagesToDelete.slice(0, msgNumber + 1).map((m) => m.id),
      );
    } catch (error) {
			sendMessage(
				call.msg.channelID,
        'Messages deletion failed',
			);
			return 
    }
	}
})