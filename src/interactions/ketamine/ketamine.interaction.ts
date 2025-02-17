import { ApplicationCommandHandler, ApplicationCommandPartial, ApplicationCommandType, SlashCommandOptionType } from "../../../deps.ts";
import { Ketamine } from "./ketamine.function.ts";

// Creater interation object
export const KetamineInteraction: ApplicationCommandPartial = {
	name: "yee",
	description: "*Should* send a pong.",
	options: [
		{
			name: 'content',
			description: 'Content of the expected pong from the bot',
			required: true,
			type: SlashCommandOptionType.STRING
		}
	]
}

// Create interaction handler
export const KetamineHandler: ApplicationCommandHandler = {
	name: 'yee',
	type: ApplicationCommandType.CHAT_INPUT,
	//guild?: string
	//parent?: string
	//group?: string
	handler: Ketamine
}
