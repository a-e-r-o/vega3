// Types
import { Message, sendMessage, getMessages, deleteMessage, deleteMessages, memberHasPermission, Permission } from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'
import * as Discord from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'
import { Call } from '../class/class.ts'
// cache
import { cache } from '../../main.ts'

cache.commands.set('clear', {
	aliases: ['clear', 'cls', 'clean'],
	permission: [0],
	main: async(call: Call) => {
		let member: Discord.Member | undefined = await Discord.getMember(call.msg.guildID, call.msg.author.id);
		let guild: Discord.Guild | undefined = call.msg.guild();
		if(member !== undefined && guild !== undefined){
			if (!memberHasPermission(
				call.msg.author.id,
				guild,
				member.roles,
				["MANAGE_MESSAGES"]
			)) {
				sendMessage(
					call.msg.channel,
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
        call.msg.channel,
        { limit: 100 },
      );
      if (!messagesToDelete) return;

      await deleteMessages(
        call.msg.channel,
        // + 1 to include the message that triggered the command
        messagesToDelete.slice(0, msgNumber + 1).map((m) => m.id),
      );
    } catch (error) {
			sendMessage(
				call.msg.channel,
        'Messages deletion failed',
			);
			return 
    }
	}
})