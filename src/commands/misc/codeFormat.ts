import { CommandCall, Command, CommandTags, getMessage, v, sendMessage } from '../../mod.ts'

export const format: Command = {
	tags: CommandTags.DisabledInDm,
	aliases: ['format'],
	execute: async(call: CommandCall) => {
		if (
			!call.msg.messageReference ||
			!call.msg.messageReference?.channelId ||
			!call.msg.messageReference?.guildId ||
			!call.msg.messageReference?.messageId
		) return 'Use this command in response to an existing message'


		const refMsg = await getMessage(v, call.msg.messageReference.channelId, call.msg.messageReference.messageId)

		if (refMsg.content.length == 0)
			return 'Referenced message is empty'

		sendMessage(v, call.msg.channelId, {content: `\`\`\`${refMsg.content}\`\`\``})
	}
}