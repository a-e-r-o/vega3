import { CmdCall, Preferences, readSet, saveSet } from "../mod.ts";

export class PrefsService {
	prefs: Preferences[] = []

	constructor(){
		this.prefs = readSet('prefs') as Preferences[]
	}

	updatePrefs(call: CmdCall){
		const index = this.prefs.findIndex(x => x.guildId === call.msg.guildId?.toString())

		if (index < 0 && call.msg.guildId)
			this.prefs.push({ guildId: call.msg.guildId.toString(), lang: 'fr' })
			
		saveSet('prefs', this.prefs)
	}
}