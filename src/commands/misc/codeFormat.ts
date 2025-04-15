import { MessagesManager } from '../../../deps.ts';
import { BOT } from '../../../main.ts';
import { CommandCall, Command, CommandTags } from '../../mod.ts'

export const format: Command = {
	tags: CommandTags.DisabledInDm,
	aliases: ['format'],
	execute: async(call: CommandCall) => {
		if (
			!call.msg.messageReference ||
			!call.msg.messageReference?.channel_id ||
			!call.msg.messageReference?.guild_id ||
			!call.msg.messageReference?.message_id
		) return 'Use this command in response to an existing message'

		const refMsg = 
			await call.msg.channel.messages.resolve(call.msg.messageReference.message_id)

		if(!refMsg)
			throw 'Cannot get referenced message'

		if (refMsg.content.length == 0)
			return 'Referenced message has no text'

		call.msg.channel.send(`\`\`\`${refMsg.content}\`\`\``)
	}
}