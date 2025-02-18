import { ApplicationCommandHandler, ApplicationCommandPartial, ApplicationCommandType, SlashCommandOptionType } from "../../../deps.ts";
import { ClearMsgs } from "./clearMsgs.function.ts";



// Creater interation object
export const ClearMsgsInteraction: ApplicationCommandPartial = {
	name: 'clearmessages',
	description: 'Deletes a bunch of messages in current channel',
	defaultPermission: false,
	options: [
		{
			name: 'count',
			description: 'Number of messages to clear',
			required: true,
			type: SlashCommandOptionType.NUMBER,
		}
	]
}

// Create interaction handler
export const ClearMsgsHandler: ApplicationCommandHandler = {
	name: 'clearmessages',
	type: ApplicationCommandType.CHAT_INPUT,
	handler: ClearMsgs
}
