import { Embed } from "../../deps.ts";
import { TriggerPattern, TriggerPatternType } from "../../types/mod.ts";

export function error(input: string){
	const embed: Embed = {
		color: 15087872,
		description: `\`\`\`diff\n-${input}\`\`\``
	}
	return {embeds: [embed]}
}
export function warning(input: string){
	const embed: Embed = {
		title: 'Command failed',
		color: 14971947,
		description: input
	}
	return {embeds: [embed]}
}
export function formatTriggerEmbed(triggerPattern: TriggerPattern){
	const embed: Embed = {
	}

	embed.title = triggerPattern.title
	embed.description = triggerPattern.description
	embed.color = triggerPattern.color
	// embeded image
	if (triggerPattern.mediaUrl)
		embed.image = {url: triggerPattern.mediaUrl}
	// embeded 
	if (triggerPattern.thumbnail)
		embed.thumbnail = {url: triggerPattern.thumbnail}
	
	// Special behaviour for certain triggerPattern types
	switch (triggerPattern.type) {
		case TriggerPatternType.thoughtCrime:
			embed.title = `:no_pedestrians:  Warning citizen! -${triggerPattern.scroreDifferential} social credits.`
			embed.thumbnail = {url: 'https://i.imgur.com/r5rFQTN.png'}
			embed.color = 16732194
			break
	
		case TriggerPatternType.goodCitizenSpeech:
			embed.title = `:white_check_mark:  Good job citizen! +${triggerPattern.scroreDifferential} social credits.`
			embed.thumbnail = {url: 'https://i.imgur.com/kY5sLW0.png'}
			embed.color = 4063062
			break
	}

	return {embeds: [embed]}
}