import { Message, Embed } from '../mod.ts'

export type Config = {
	token: string
	prefix: string
	admins: string[]
}

export enum CmdTags {
	None = 0,
	Disabled = 1,
	DisabledInDm = 2,
	BotAdminRequired = 4,
	GuildAdminRequired = 8,
	GuildManageMsgRequired = 16,
}

export type Cmd = {
	tags: CmdTags
	aliases: string[]
	execute: (call: CmdCall) => Promise<Embed|string|void>|Embed|void|string
}

export type CmdCall = {
	channel: bigint
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