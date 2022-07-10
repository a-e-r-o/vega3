import { formatTriggerEmbed, TriggerPatternType, formatSocialCreditTriggerEmbed, DiscordenoMessage, sendMessage, SocialCreditsService } from "../mod.ts";
import { triggerPatterns_en } from "../ressources/triggerpatterns-en.ts";

export async function spy(msg: DiscordenoMessage, service: SocialCreditsService){
	// Find if the message matches any trigger word pattern
	const foundPattern = triggerPatterns_en.find(pattern => 
		msg.content.match(new RegExp(pattern.regex, pattern.regexArgs))
	)
	// If no pattern found, exit
	if (!foundPattern)
		return

	if (foundPattern.type == TriggerPatternType.goodCitizenSpeech || foundPattern.type == TriggerPatternType.thoughtCrime) {
		// Get data from DB
		const citizen = await service.getCitizen(msg.authorId)
		const triggerLog = await service.getTriggerLog(msg.authorId, foundPattern.id)

		// time delta between last trigger and now in ms
		const timeDelta = (new Date).getTime() - triggerLog.timestamp
		// 10 min = -1 factor
		if (timeDelta > 600000){
			const newFactor = triggerLog.factor - Math.floor(timeDelta/600000)
			triggerLog.factor = newFactor >= 0 ? newFactor : 0
		}
		
		let factoredDifferencial = 0
		// ScoreDelta = scroreDifferential +/- 20%
		const scoreDelta = (foundPattern.scroreDifferential ?? 0) * Math.round((0.8 + (Math.floor(Math.random()*5)*0.1)) * 10)/10 // Between 0.8 and 1.2 (O.8 + rand(0, 0.4)
		// Do special treatment based on pattern type
		if (foundPattern.type == TriggerPatternType.thoughtCrime) {
			factoredDifferencial = Math.floor(scoreDelta * (triggerLog.factor + 1))
			citizen.score -= factoredDifferencial
		}
		else if (foundPattern.type == TriggerPatternType.goodCitizenSpeech) {
			factoredDifferencial = Math.floor(scoreDelta / Math.pow(2, triggerLog.factor))
			citizen.score += factoredDifferencial
		}

		// Update logs and citizen in DB
		triggerLog.factor += 1
		triggerLog.timestamp = (new Date).getTime()
		await service.updateTriggerLog(triggerLog)
		await service.updateCitizen(citizen)

		sendMessage(msg.channelId, formatSocialCreditTriggerEmbed(foundPattern, factoredDifferencial))
		return
	}

	// Return pattern trigger message
	sendMessage(msg.channelId, formatTriggerEmbed(foundPattern))
}