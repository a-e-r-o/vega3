import { Message } from '../../deps.ts'
import { GuildSettings, strNormalize } from '../mod.ts';

export class CommandCall {
	/**
	 * Discord channel ID
	 */
	channel: string
	/**
	 * Settings for the message's guid, 
	 */
	guildSettings: GuildSettings
	/**
	 * Original message object
	 */
	message: Message
	/**
	 * Message content without prefix and command name
	 */
	msgStriped: string
	/**
	 * Command name (Alias of a command that's been recognized)
	 */
	commandName: string
	/**
	 * Arguments (separated by spaces in message content)
	 */
	args: string[]
	
	constructor(message: Message, prefix: string, guildSettings: GuildSettings){
		// Remove prefix from message
		const msgWithoutPrefix = message.content.slice(prefix.length)
		
		this.message = message
		this.channel = message.channelID
		this.guildSettings = guildSettings
		// Split message on spaces
		this.args = msgWithoutPrefix.split(' ').filter(x => x !== ' ' && x !== '')
		// Remove first arg and set it as commandName
		this.commandName = strNormalize(this.args.shift() ?? '')
		// Remove commandName from message content
		this.msgStriped = msgWithoutPrefix.slice(this.commandName.length).trim()
	}
}