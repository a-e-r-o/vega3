import { ApplicationCommandInteraction, Interaction, InteractionType, MessageComponentInteraction, ModalSubmitInteraction } from "../../deps.ts";
import { CONTEXT, BOT } from "../../main.ts";

export async function onInteractionCreate(interaction: Interaction){
	console.log(`Interaction received : ${interaction.type}`)

	// interaction.data : Undefined only when Interaction is PING (http-only).*
	// interaction.data

	let appCommand;
	
	//if(interaction.type != InteractionType.PING){
	if(isCommandInteraction(interaction)){
		appCommand = CONTEXT.interactions[interaction.data.id]

		if(appCommand.superAdmin && !CONTEXT.config.admins.includes(interaction.user.id)) 
			return interaction.respond({content:'You don\'t have the right O you don\'t have the right, in short you don\'t have the right', ephemeral: true})
	}
	else {
		// TODO : Handle component/modal, autocomplete and ping interactions
	}
	
	// Once every check passed, do normal (built-in) interaction handling
	BOT.interactions._process(interaction);
}

function isCommandInteraction(value: any): value is ApplicationCommandInteraction {
	return (
		value && typeof value === 'object' &&
		value.type !== InteractionType.APPLICATION_COMMAND
	)
}

function isComponentOrModalInteraction(value: any): value is ApplicationCommandInteraction {
	return (
		value && typeof value === 'object' &&
		value.type !== InteractionType.MODAL_SUBMIT || value.type !== InteractionType.MESSAGE_COMPONENT 
	)
}