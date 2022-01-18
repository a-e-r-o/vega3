import { DiscordenoMessage, sendMessage } from "../../deps.ts";
import { creditsSrv } from "../../services/mod.ts";
import { triggerPatterns, TriggerPatternType } from "../../types/mod.ts";
import { formatTriggerEmbed } from "../vega/format.ts";

export async function spy(msg: DiscordenoMessage){
	// Find if the message matches any trigger word pattern
	const foundPattern = triggerPatterns.find(pattern => 
		msg.content.match(new RegExp(pattern.regex, pattern.regexArgs))
	)
	// If no pattern found, exit
	if (!foundPattern)
		return

	// Get citizen
	const citizen = await creditsSrv.getCitizen(msg.authorId)
	
	// Do special treatment based on pattern type
	switch(foundPattern.type){
		case TriggerPatternType.thoughtCrime:
			citizen.score -= foundPattern.scroreDifferential ?? 0
			await creditsSrv.updateCitizen(citizen)
			break;

		case TriggerPatternType.goodCitizenSpeech:
			citizen.score += foundPattern.scroreDifferential ?? 0
			await creditsSrv.updateCitizen(citizen)
			break;
	}

	// Return pattern trigger message
	sendMessage(msg.channelId, formatTriggerEmbed(foundPattern))
}