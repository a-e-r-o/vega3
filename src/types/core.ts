import { Message, Embed } from '../../deps.ts'
import { CommandTags } from '../mod.ts';

export type Config = {
	token: string
	prefix: string
	admins: string[]
}

export type Command = {
	/**
	 * Options for the command. Mainly used for execution conditions
	 */
	tags: CommandTags
	/** 
	 * Aliases used to invoke the command. The first alias doubles as an ID for the command
	 */
	aliases: string[]
	/**
	 * Main part of the command : the function executed when the command is invoked
	 * @param call object containing all the data parsed from the message used to invoke the command
	 * @returns 
	 */
	execute: (call: CommandCall) => Promise<Embed|string|void>|Embed|void|string
}

export type CommandCall = {
	/**
	 * Discord channel ID
	 */
	channel: string
	/**
	 * Settings for the message's guid, 
	 */
	guildSettings: GuildSettings
	msg: Message
	msgStriped: string
	cmd: string
	args: string[]
}

export type LangOption = {
	id: number
	arg: string
	name: string
}

export type GuildSettings = {
	guildId: string
	lang: number
	triggers: { regex: string, regexOptions: string, response: string }[]
}