import { SlashCommandInteraction, TextChannel } from "../../../deps.ts";
import { BOT } from "../../../main.ts";

const MAX_MSG_NUMBER = 100 // defined by https://discord.com/developers/docs/resources/message#bulk-delete-messages


// Create handler function
export async function ClearMsgs (interaction: SlashCommandInteraction){
	try {
		const msgCountArg = parseInt(interaction.data.options[0]?.value)

		if (isNaN(msgCountArg) || msgCountArg <= 1 || msgCountArg > MAX_MSG_NUMBER)
			return interaction.respond({ephemeral: true, content: 'Please pick a number beteween 2 and 100'})

		// if member has permission to manage messages
		if (!(interaction.member?.permissions.has('MANAGE_MESSAGES')))
			return interaction.respond({ephemeral: true, content: `You don't have the right, O you don't have the right.`})
		
		await interaction.respond({ephemeral: true,  content: `Deleting ${msgCountArg} messages...`})
		
		try {
			if (!interaction.channel)
				throw new Error('Channel is undefined');

			const channelManager = new TextChannel(BOT, interaction.channel)
			const messageIds = (await channelManager.fetchMessages({limit: msgCountArg})).array().map(x => x.id)
		
			if (messageIds.length > 0) 
				// Harmony library does not implement the bulkDelete function so we have to make the call to the API
				await BOT.rest.post(`/channels/${channelManager.id}/messages/bulk-delete`, {messages: messageIds})
		}
		catch (_error) {
			return interaction.editResponse({ephemeral: true, content: 'Could not delete messages *(messages too old, BOT missing permission, or no messages found)*'})
		}

		interaction.editResponse({ephemeral: true,  content: `Deleted ${msgCountArg} messages`})
	}
	catch (e){
		console.log(e)
	}
}