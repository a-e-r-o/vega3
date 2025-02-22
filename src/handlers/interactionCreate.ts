import { Interaction } from "../../deps.ts";

export async function interactionCreateHandler(interaction: Interaction){
	// If message is from a bot, ignore
	console.log(`Interaction received : ${interaction.type}`)
}