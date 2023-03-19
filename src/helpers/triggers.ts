import { GuildSettings, Message } from "../mod.ts"

export function checkTriggers(msg: Message, guildSettings: GuildSettings){
	// Find if the message matches any trigger word pattern
	const foundPattern = guildSettings.triggers.find(
		pattern => msg.content.match(new RegExp(pattern.regex, pattern.regexOptions))
	)
	// If no pattern found, exit
	if (!foundPattern)
		return
	else
		return foundPattern.response
}