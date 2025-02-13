import { ApplicationCommandHandler, InteractionApplicationCommandData, ApplicationCommandHandlerCallback, ApplicationCommandType, Interaction, InteractionResponse, SlashCommandOptionType, MessageComponentData, TextInputStyle, MessageComponentType, ButtonStyle, SelectComponent, InteractionResponseModal, InteractionResponseType, ButtonComponent, ActionRowComponent, InteractionMessageOptions } from "../../deps.ts";

// Creater interation object
export const YeeInteraction = {
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
let options = [
	{
		label: 'Ketamine',
	  value: 'ket',
	  default: true,
	  description: 'to drive your honda civic better'
	},
	{
		label: 'Fentanyl',
	  value: 'fent',
	  description: 'die, you will'
	}
]

const selectComponent: SelectComponent = {
	type: MessageComponentType.SELECT,
  customID: '10',
  options: options
};
const buttonComponent: ButtonComponent = {
	type: MessageComponentType.Button,
	label: 'Ketamine',
	style: ButtonStyle.GREEN,
	customID: '112229907884085659',
	//url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRonKsMgGRfRj9KCQByj3C_I4FpkZYQWCfRiQ&s',
	disabled: false
};
const actionRowComponent: ActionRowComponent = {
	type: MessageComponentType.ACTION_ROW,
	components: [buttonComponent]
}


// Create handler function
const YeeFunction: ApplicationCommandHandlerCallback = function(interaction: Interaction){
	try {
		
		let value = '';
		if (interaction.data && 'options' in interaction.data) {
			const data = interaction.data as InteractionApplicationCommandData;
			value = data.options[0].value ?? '(cannot get value)';
		}

		const i: InteractionMessageOptions = {

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

// Create interaction handler
export const YeeHandler: ApplicationCommandHandler = {
	name: 'yee',
	type: ApplicationCommandType.USER,
	//guild?: string
	//parent?: string
	//group?: string
	handler: YeeFunction
}
