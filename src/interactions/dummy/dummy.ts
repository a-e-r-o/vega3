import { ApplicationCommandHandler, ApplicationCommandType, InteractionResponse, SlashCommandInteraction, SlashCommandOptionType } from "../../../deps.ts";
import { VegaAppCommand } from "../../mod.ts";

// Components
import { actionRowComponent } from "./Components/dummy.components.ts";
export { validateHandler } from './Components/dummy.validate.ts'


// --- Interaction ---
export const interaction : VegaAppCommand = {
	superAdmin: false,
	permissions: [],
	appCommand: {
		name: 'yee',
		description: '*Should* send a pong.',
		options: [
			{
				name: 'content',
				description: 'Content of the expected pong from the bot',
				required: true,
				type: SlashCommandOptionType.STRING
			}
		]
	}
}

// --- Handler ---
export const handler : ApplicationCommandHandler = {
	name: 'yee',
	type: ApplicationCommandType.CHAT_INPUT,
	handler: DummyHandlerFunction
}

// --- Function
export function DummyHandlerFunction (interaction: SlashCommandInteraction){
	try {
		const arg1 = interaction.data.options[0]?.value ?? '(no value)';

		const response: InteractionResponse = {
			content: `Hello, ${arg1}`,
			customID: 'DummyInteractionResponse',
			title: 'HEY HEY HEY',
			components: [actionRowComponent],
		}

		interaction.respond(response)
	}
	catch (e){
		console.log(e)
	}
}

