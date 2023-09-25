import { consts, GuildSettings, readFolderSets, recordToArray, saveSet } from "../mod.ts"

export class GuildSettingsService {
	private guildSettings: Record<string, GuildSettings> = {}

	constructor(){
		const dbGuildSettings = readFolderSets('guildSettings') as GuildSettings[]
		for (const guidlSetting of dbGuildSettings) {
			this.guildSettings[guidlSetting.guildId] = guidlSetting
		}
	}

	// === Private functions ===

	/**
	 * Adds (ONLY IN MEMORY) a preference object for the provided guild id, and return it
	 */
	private initNewGuildSetting(id: string){
		const setting = consts.defaultGuildSetting
		// 0n is default ID, for DMs
		if (id != '0') {
			// If not in DM, init settings with default, then set id
			setting.guildId = id
			this.guildSettings[id] = setting
			// return reference to list item
			return this.guildSettings[id]
		}
		else 
			// return object as-is
			return setting
	}

	private writeGuildSettings(guildId: bigint){
		saveSet(guildId.toString(), [this.guildSettings[guildId.toString()]], 'guildSettings')
	}
	
	// === Public functions ===

	/**
	 * Create and/or get preferences for a guild. If guid ID is 0n, returns default settings
	 */
	getGuildSettings(guildId: bigint): GuildSettings {
		const setting = this.guildSettings[guildId.toString()]
		return setting == null ? this.initNewGuildSetting(guildId.toString()) : setting
	}
	
	/**
	 * Update language preference for a guild
	 */
	setLang(guildId: bigint, lang: number){
		const settings = this.getGuildSettings(guildId)
		settings.lang = lang
		this.writeGuildSettings(guildId)
	}

	/**
	 * Trigger READ
	 */
	triggerList(guildId: bigint){
		return this.getGuildSettings(guildId)?.triggers
	}

	/**
	 * Trigger CREATE
	 * Returns a number, the ID of the new trigger
	 * In case of error, returns -1
	 */
	addTrigger(guildId: bigint, regex: string, response: string, regexParams = ''): number {
		try {
			const settings = this.getGuildSettings(guildId)
			settings.triggers.push({
				regex: regex,
				regexOptions: regexParams,
				response: response
			})
			this.writeGuildSettings(guildId)
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
	deleteTrigger(guildId: bigint, index: number): boolean {
		try {
			const settings = this.getGuildSettings(guildId)
			settings.triggers.splice(index, 1)
			this.writeGuildSettings(guildId)
			return true
		}
		catch(error){
			console.log('Error while removing a trigger to guild config : ', error)
			return false
		}
	}
}