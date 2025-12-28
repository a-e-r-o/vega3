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