import { ctx, Command, CommandCall, langOptions, CommandTags } from '../../mod.ts'

export const prefs: Command = {
	tags: CommandTags.Disabled,
	aliases: ['setlang', 'lang', 'langage', 'language'],
	execute: (call: CommandCall) => {

		// If arg 2 is empty
		if (!call.args[0])
			throw 'Missing language argument. Language list : en, fr'

		// Try to find specified lang
		const foundLang = langOptions.find(x => new RegExp(x.arg,'i').test(call.args[0]))
		
		// If incorrect lang, abort
		if (!foundLang)
			throw 'Unknown language. Language list : en, fr'
		// If correct lang
		else
			ctx.guildSettingsService.setLang(call.msg.guildId!, foundLang.id)

		return `Vega language set to ${foundLang.name}`
	}
}