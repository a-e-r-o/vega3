import { Embed } from "../../../deps.ts";
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
export function formatSocialCreditTriggerEmbed(triggerPattern: TriggerPattern, factoredScroreDifferential: number){
	const embed: Embed = {}

	if (triggerPattern.type == TriggerPatternType.thoughtCrime) {
		embed.title = `:no_pedestrians:  Warning citizen! -${factoredScroreDifferential} social credits.`
		embed.thumbnail = {url: 'https://i.imgur.com/r5rFQTN.png'}
		embed.color = 16732194
	}
	else if (triggerPattern.type == TriggerPatternType.goodCitizenSpeech) {
		embed.title = `:white_check_mark:  Good job citizen! +${factoredScroreDifferential} social credits.`
		embed.thumbnail = {url: 'https://i.imgur.com/kY5sLW0.png'}
		embed.color = 4063062
	}
	embed.description = triggerPattern.description

	if (triggerPattern.mediaUrl)
		embed.image = {url: triggerPattern.mediaUrl}

	return {embeds: [embed]}
}
export function formatTriggerEmbed(triggerPattern: TriggerPattern){
	const embed: Embed = {}

	embed.title = triggerPattern.title
	embed.description = triggerPattern.description
	embed.color = triggerPattern.color
	
	if (triggerPattern.mediaUrl)
		embed.image = {url: triggerPattern.mediaUrl}

	if (triggerPattern.thumbnail)
		embed.thumbnail = {url: triggerPattern.thumbnail}

	return {embeds: [embed]}
}