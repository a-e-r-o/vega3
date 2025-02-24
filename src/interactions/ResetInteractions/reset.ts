import { ApplicationCommandHandler, ApplicationCommandType, SlashCommandInteraction } from "../../../deps.ts";
import { BOT, CONTEXT } from "../../../main.ts";
import { VegaAppCommand } from "../../mod.ts";

// --- Interaction ---
export const interaction : VegaAppCommand = {
	superAdmin: true,
	permissions: [],
	appCommand: {
		name: 'resetinteractions',
		description: 'Unregisters all interactions and terminates the bot'
	}
}

// --- Handler ---
export const handler : ApplicationCommandHandler = {
	name: 'resetinteractions',
	type: ApplicationCommandType.CHAT_INPUT,
	handler: removeInteractions
}

// --- Function
export async function removeInteractions (interaction: SlashCommandInteraction){
	try {
		if (!CONTEXT.config.admins.includes(interaction.user.id))
			return interaction.respond({ephemeral: true, content: `You don't have the right, O you don't have the right.`})

		await interaction.respond({
			ephemeral: true,
			content: `I will now unregister all interactions. The bot will be terminated after this operation.`
		})

		if (!interaction.guild?.id)
			return await interaction.respond({'content': 'This command can only be used in a server.', ephemeral: true})
		
		// Replace the list of interctions with the list stored in DB... or should we ?
		const guildInteractions = await BOT.interactions.commands.guild(interaction.guild?.id)
		const globalInteractions = await BOT.interactions.commands.all()
		
		for (const element of [...guildInteractions, ...globalInteractions]){
			//await BOT.interactions.commands.delete(element[0], element[1].guildID);
			await element[1].delete()
		}

		// ⚠ ⚠ ⚠ SHUTDOWN ⚠ ⚠ ⚠
		Deno.exit()
	}
	catch (e){
		console.log(e)
	}
}

