import { Message, Embed } from '../mod.ts'

export type dbCollections = 'horoSubs' | 'prefs'

export type Config = {
	token: string
	prefix: string
	clearances: Clearance[]
}

export type Clearance = {
	userId: string
	clearance: number
}

export type CmdCall = {
	channel: bigint
	lang: Language
	msg: Message
	msgStriped: string
	cmd: string
	args: string[]
}

export type Cmd = {
	disabled ?: true
	clearance ?: number
	aliases: string[]
	execute: (call: CmdCall) => Promise<Embed|string|void>|Embed|void|string
}
	
export type Preferences = {
	guildId: string
	lang: Language
}

/**
 * English 0 ; French 1
 */
export type Language = 0 | 1