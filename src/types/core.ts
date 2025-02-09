import { Message, Embed } from '../../deps.ts'

export type Config = {
	token: string
	prefix: string
	admins: string[]
}

export enum CommandTags {
	None = 0,
	Disabled = 1,
	DisabledInDm = 2,
	BotAdminRequired = 4,
	GuildAdminRequired = 8,
	GuildManageMsgRequired = 16,
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

/**
 * List of available languages. IMPORTANT : This list must be synchronised with the `Language` union type
 */
export const langOptions: LangOption[] = [
	{ id: 0, arg: 'en', name: 'English'},
	{ id: 1, arg: 'fr', name: 'Français'}
]

export type GuildSettings = {
	guildId: string
	lang: number
	triggers: { regex: string, regexOptions: string, response: string }[]
}