import { ctx, Cmd, CmdCall, langOptions } from '../mod.ts'

export const prefs: Cmd = {
	disabled: true,
	aliases: ['pref', 'prefs', 'param', 'params'],
	execute: (call: CmdCall) => {
		// Command can only be used on a discord server
		if (!call.msg.guildId)
			throw 'This command can only be used on a Discord server'

		// If arg 2 is "lang", update language preference
		if (/lang/gmi.test(call.args[0])){
			// If no lang specified
			if (!call.args[1])
				throw 'Missing language argument'
			
			// Try to find specified lang
			const foundLang = langOptions.find(x => new RegExp(call.args[1],'i').test(x.arg))
		
			// If incorrect lang, abort
			if (!foundLang)
				throw 'Incorrect or unsupported language'
			// If correct lang
			else
				ctx.prefsService.setLang(call.msg.guildId, foundLang.id)

			return `Vega language set to ${foundLang.name}`
		}
	}
}