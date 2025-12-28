import { GuildManager, MembersManager, MessagesManager, TextChannel } from '../../../deps.ts';
import { BOT, CONTEXT } from '../../../main.ts'
import { CommandCall, Command } from '../../mod.ts'

const DEFAULT_MSG_NUMBER = 5 // defined by me
const MAX_MSG_NUMBER = 100 // defined by https://discord.com/developers/docs/resources/message#bulk-delete-messages

export const clear: Command = {
	tags: 0,
	aliases: ['clear', 'cls', 'clean'],
	execute: execute
}

async function execute (call: CommandCall) {

	if (!call.msg.guildID)
		throw 'Cannot delete messages in private conversation'

	// if member has permission to manage messages
	if (!call.msg.member?.permissions.has('MANAGE_MESSAGES'))
		throw 'Messages deletion failed *(User missing permissions)*'

	// Check if number of msg to delete is not NaN and more than 0, default 5
	let msgNumber: number = parseInt(call.args[0])
	if (!(msgNumber > 0))
		msgNumber = DEFAULT_MSG_NUMBER
	// +1 to include the message that triggered the command
	msgNumber += 1

	if (msgNumber > MAX_MSG_NUMBER)
		throw `This command is limited to ${MAX_MSG_NUMBER -1} messages at a time` // minus one because we delete the calling message

	
	try {
		const channelManager = new TextChannel(BOT, call.msg.channel)
		const messageIds = (await channelManager.fetchMessages({limit: msgNumber})).array().map(x => x.id)

		if (messageIds.length <= 0)
			return
	
		 // Harmony library does not implement the bulkDelete function so we have to make the call to the API
		const res = await BOT.rest.post(`/channels/${channelManager.id}/messages/bulk-delete`, {messages: messageIds})
	} 
	catch (_error) {
		throw 'Could not delete messages *(messages too old, BOT missing permission, or no messages found)*'
	}
}