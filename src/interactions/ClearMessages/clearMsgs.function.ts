import { InteractionResponseModal, SlashCommandInteraction } from "../../../deps.ts";

// Create handler function
export async function ClearMsgs (interaction: SlashCommandInteraction){
	try {
		const msgCountArg = parseInt(interaction.data.options[0]?.value)

		if (isNaN(msgCountArg))
			interaction.respond({ephemeral: true, content: '\'fin bro tu es cringe mets un nombre en fait'})

		// let beeo = await interaction.respond({ephemeral: true, content: 'Deleting messages...'})
		
		interaction.defer(true)

		await new Promise( resolve => setTimeout(resolve, 5000) );

		const X = 5;

		/*
		  content?: string
		  embeds?: Array<Embed | EmbedPayload>
		  tts?: boolean
		  flags?: number | InteractionResponseFlags[]
		  allowedMentions?: AllowedMentionsPayload
		  
			// Whether the Message Response should be Ephemeral (only visible to User) or not 

		  ephemeral?: boolean
		  components?: MessageComponentData[]
		  files?: MessageAttachment[]
		*/

		const ALTresponse: InteractionResponseModal = {
			//type: InteractionResponseType.MODAL,
			//content: `Hello, ${value}`,
			customID: '933299078840156596',
			title: 'HEY HEY HEY',
			//customID: '9',
			components: []
		}


		interaction.editResponse({ephemeral: true,  content: `Cleared ${X} messages`})
	}
	catch (e){
		console.log(e)
	}
}