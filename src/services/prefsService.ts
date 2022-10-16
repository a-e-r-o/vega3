import { CmdCall, Language, Preferences, readSet, recordToArray, saveSet } from "../mod.ts";

export class PrefsService {
	private prefs: Record<string, Preferences> = {}

	constructor(){
		const dbPrefs = readSet('prefs') as Preferences[]
		for (const pref of dbPrefs) {
			this.prefs[pref.guildId] = pref
		}
	}

	// === Private functions ===

	/**
	 * Adds (ONLY IN MEMORY) a preference object for the provided guild id, and return it
	 */
	private init(id: bigint){
		const strId = id.toString()
		this.prefs[strId] = {guildId: strId}
		return this.prefs[strId]
	}

	/**
	 * Get preferences for a guild
	 */
	private getPrefs(guildId: bigint | undefined): Preferences | null {
		if (!guildId)
			return null
		return this.prefs[guildId.toString()] ?? null
	}

	// === Public functions ===

	/**
	 * Update language preference for a guild
	 */
	setLang(guildId: bigint, lang: Language){
		let guildPref = this.getPrefs(guildId)

		if (!guildPref)
			guildPref = this.init(guildId)

		guildPref.lang = lang
		saveSet('prefs', recordToArray(this.prefs))
	}

	/**
	 * Get language preference for a guild. If none set, default is english
	 */
	getLang(guildId: bigint | undefined): Language {
		const pref = this.getPrefs(guildId)
		return pref?.lang ?? 0
	}
}