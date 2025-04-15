export type LangOption = {
	id: number
	arg: string
	name: string
}

export type GuildSettingsDto = {
	guildId: string
	setting: GuildSettings
}

export type Trigger = {
	regex: string
	regexOptions: string
	response: string
}

export type GuildSettings = {
	lang: number
	triggers: Trigger[]
}

export type GuildSettingsCache = {
	value: GuildSettings
	guildId: string
	timeoutId: number
}