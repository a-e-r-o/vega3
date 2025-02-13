import { Message } from '../../deps.ts';
import { CommandCall, strNormalize, GuildSettings } from '../mod.ts'


/** 
 * Takes a message, parse it and returns a CommandCall 
 */
export function parseCall(message: Message, prefix: string, guildSettings: GuildSettings): CommandCall {
	const msgNoPre = message.content.replace(RegExp(`^${prefix}`,'i'),'').trim()
	const args = msgNoPre.split(' ').filter(x => x !== ' ' && x !== '')
	const cmd = strNormalize(args.shift() ?? '')
	const msgStriped = msgNoPre.replace(cmd, '').trim()

	if (!message.channelID)
		message.channelID = ''

	return {
		msg: message,
		msgStriped: msgStriped,
		args: args,
		cmd: cmd,
		channel: message.channelID,
		guildSettings: guildSettings
	}
}

