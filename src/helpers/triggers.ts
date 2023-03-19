import { GuildSettings, Message, vegaLog } from "../mod.ts"

export function checkTriggers(msg: Message, guildSettings: GuildSettings){
	let foundPattern = undefined

	// Find if the message matches any trigger pattern
	for (let i = 0; i < guildSettings.triggers.length; i++) {
		const pattern = guildSettings.triggers[i];
		try {
			if (msg.content.match(new RegExp(pattern.regex, pattern.regexOptions))){
				foundPattern = pattern
				break
			}
		} 
		catch {
			vegaLog(`Malformed regex /${pattern.regex}/${pattern.regexOptions} on server ${guildSettings.guildId}`)
		}
	}

	// If no pattern found, exit
	if (!foundPattern)
		return
	else
		return foundPattern.response
}