import { CmdCall, Language, Preferences, readSet, recordToArray, saveSet } from "../mod.ts";

export class PrefsService {
	private prefs: Record<string, Preferences> = {}

	constructor(){
		const dbPrefs = readSet('prefs') as Preferences[]
		for (const pref of dbPrefs) {
			this.prefs[pref.guildId] = pref
		}
	}

	/**
	 * Set preferences for a guild
	 */
	updatePrefs(call: CmdCall){
		const guild = call.msg.guildId?.toString()

		if (!guild)
			throw 'Command unusable outside of a Discord server'
			
		this.prefs[guild] = {guildId: guild, lang: 0}
		saveSet('prefs', recordToArray(this.prefs))
	}

	/**
	 * Get preferences for a guild
	 */
	getPrefs(guildId: bigint | undefined): Preferences | null {
		if (!guildId)
			return null
		return this.prefs[guildId.toString()] ?? null
	}

	/**
	 * Get language preference for a guild. If none set, default is english
	 */
	getLang(guildId: bigint | undefined): Language {
		const pref = this.getPrefs(guildId)
		return pref?.lang ?? 0
	}
}