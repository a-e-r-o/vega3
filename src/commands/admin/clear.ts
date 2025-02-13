import { permission } from 'node:process';
import { GuildManager, MembersManager } from '../../../deps.ts';
import { BOT, CONTEXT } from '../../../main.ts'
import { CommandCall, Command } from '../../mod.ts'

export const clear: Command = {
	tags: 0,
	aliases: ['clear', 'cls', 'clean'],
	execute: execute
}

async function execute (call: CommandCall) {

	if (!call.msg.guildID)
		throw 'Cannot delete messages in private conversation'

	// if member has permission to manage messages
	const canDelMsgPerm = call.msg.member?.permissions.has('MANAGE_MESSAGES')

	if (!canDelMsgPerm)
		throw 'Messages deletion failed *(User missing permissions)*'

	let msgNumber: number = parseInt(call.args[0])
	// Check if not NaN and more than 0, default 5
	if (!(msgNumber > 0))
		msgNumber = 5
	// +1 to include the message that triggered the command
	msgNumber += 1

	if (msgNumber > 1000)
		throw 'This command is limited to 1000 messages at a time'

	do {
		const limit = msgNumber > 100 ? 100 : msgNumber
		try {
			const messages = await getMessages(v, call.channel, { limit: limit })
			const msgIds = messages.map(x => x.id)
			
			if (msgIds.length == 0)
				return

			msgNumber -= limit
			
			await deleteMsgs(v, messages.map(x => x.id), call.channel)
		} catch (_error) {
			throw 'Could not delete messages *(messages too old, vega missing permission, or no messages found)*'
		}
	}	while (msgNumber > 0)
}