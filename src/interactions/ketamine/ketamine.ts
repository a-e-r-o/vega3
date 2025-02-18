import { ApplicationCommandHandler, ApplicationCommandPartial, ApplicationCommandType, Interaction, InteractionApplicationCommandData, InteractionResponseModal, SlashCommandOptionType } from "../../../deps.ts";
import { actionRowComponent } from "./Components/ketamine.components.ts";

// Component Handlers
export { validateHandler } from './Components/ketamine.validate.ts'

// --- Interaction ---
export const interaction : ApplicationCommandPartial = {
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

// --- Handler ---
export const handler : ApplicationCommandHandler = {
	name: 'yee',
	type: ApplicationCommandType.CHAT_INPUT,
	handler: Ketamine
}

// --- Function
export function Ketamine (interaction: Interaction){
	try {
		
		let value = '';
		if (interaction.data && 'options' in interaction.data) {
			const data = interaction.data as InteractionApplicationCommandData;
			value = data.options[0].value ?? '(cannot get value)';
		}

		const response: InteractionResponseModal = {
			//type: InteractionResponseType.MODAL,
			//content: `Hello, ${value}`,
			customID: '933299078840156596',
			title: 'HEY HEY HEY',
			//customID: '9',
			components: [actionRowComponent],
		}

		interaction.respond(response)
	}
	catch (e){
		console.log(e)
	}
}

