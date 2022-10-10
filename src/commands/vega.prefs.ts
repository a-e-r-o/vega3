import { ctx } from "../../main.ts";
import { Cmd, CmdCall } from '../mod.ts'

export const prefs: Cmd = {
	aliases: ['pref', 'prefs', 'param', 'params'],
	execute: (call: CmdCall) => {
		ctx.prefsService.updatePrefs(call)
		return 'Understood'
	}
}