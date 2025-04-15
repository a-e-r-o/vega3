import { Cache, consts, GuildSettings, GuildSettingsCache, GuildSettingsProvider, Trigger } from "../mod.ts"

interface TriggerDto {
	regex: string
	regexOptions: string
	response: string
	triggerId: number
	guildId: string
	// TODO ADD a NAME ?
}

export class GuildSettingsService {
	private readonly provider: GuildSettingsProvider
	private cache: Cache<GuildSettings>
	public ready = false

	constructor(dbConnectionString: string){
		this.provider = new GuildSettingsProvider(dbConnectionString)
		this.cache = new Cache<GuildSettings>()
		this.initCache()
	}

	// === Private functions ===

	private async initCache(){
		const dbSettings = await this.provider.fetchAll();
		for (const row of dbSettings) {
			this.cache.set(row.guildId, row.setting)
		}
		this.ready = true
	}

	private updateGuildSetting(guildId: string, setting: GuildSettings){
		this.cache.set(guildId, setting)
		this.provider.update(guildId, setting)
	}
	
	// === Public functions ===

	/**
	 * Create and/or get preferences for a guild. If guid ID is 0n, returns default settings
	 */
	async getGuildSettings(guildId: string): Promise<GuildSettings> {
		let value = this.cache.get(guildId)

		if (!value) {
			const dbSetting = await this.provider.fetchOne(guildId)
			value = dbSetting ?? consts.defaultGuildSetting
			this.updateGuildSetting(guildId, value)
		}

		return value
	}
	
	/**
	 * Update language preference for a guild
	 */
	async setLang(guildId: string, lang: number): Promise<void> {
		const settings = await this.getGuildSettings(guildId)
		settings.lang = lang
		this.updateGuildSetting(guildId, settings)
	}

	/**
	 * Trigger READ
	 */
	async getTriggerList(guildId: string): Promise<Trigger[]> {
		const settings = await this.getGuildSettings(guildId)
		return settings.triggers
	}

	/**
	 * Trigger CREATE
	 * Returns a number, the ID of the new trigger
	 * In case of error, returns -1
	 */
	async addTrigger(guildId: string, regex: string, response: string, regexParams = ''): Promise<number> {
		try {
			const settings = await this.getGuildSettings(guildId)
			settings.triggers.push({
				regex: regex,
				regexOptions: regexParams,
				response: response
			})
			this.updateGuildSetting(guildId, settings)
			return settings.triggers.length - 1
		}
		catch(error) {
			console.log('Error while adding a trigger to guild config : ', error)
			return -1
		}
	}

	/**
	 * Trigger DELETE
	 */
	async deleteTrigger(guildId: string, index: number): Promise<boolean> {
		try {
			const settings = await this.getGuildSettings(guildId)
			settings.triggers.splice(index, 1)
			this.updateGuildSetting(guildId, settings)
			return true
		}
		catch(error){
			console.log('Error while removing a trigger to guild config : ', error)
			return false
		}
	}
}