import { Interaction, InteractionApplicationCommandData, InteractionResponseModal } from "../../../deps.ts";
import { actionRowComponent } from "./Components/ketamine.components.ts";


// Create handler function
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

