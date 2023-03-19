import { ctx, Cmd, CmdCall, CmdTags } from '../../mod.ts'

/**
 * List all triggers for the current guild, with their IDs (needed to delete them)
 */
export const listTrigger: Cmd = {
	tags: CmdTags.DisabledInDm + CmdTags.BotAdminRequired,
	aliases: ['triggerlist', 'triggers'],
	execute: (call: CmdCall) => {
		const list = ctx.guildSettingsService.triggerList(call.msg.guildId!)
		let res = ''
		for (let i = 0; i < list.length; i++) {
			res += `\`ID\` : ${i} => \`${list[i].regex}\`\n`
		}
		res = res == '' ? 'No triggers created for this Discord Server' : res
		return res
	}
}

/**
 * Create a new trigger
 * Syntax : vega +trigger [regex] ; [response] ; ([regex options])
 */
export const addTrigger: Cmd = {
	tags: CmdTags.DisabledInDm + CmdTags.BotAdminRequired,
	aliases: ['addtrigger', '+trigger'],
	execute: (call: CmdCall) => {
		const options = call.msgStriped.split(';').map(x => x.trim()).filter(x => x !== '')

		if (options.length < 2)
			throw "Missing arguments. Syntax is +trigger [regex] ; [response] ; (optional)[regex options]"
		
		const regex = options[0].replaceAll(/^`|`$/gi, '')
		const regexOptions = options[2]
		const response = options[1]

		try {
			''.match(new RegExp(regex, regexOptions))
		}
		catch (error) {
			throw `Malformed error \`${error}\``
		}

		return ctx.guildSettingsService.addTrigger(call.msg.guildId!, regex, response, regexOptions)
	}
}

/**
 * Delete a trigger based on its ID. The ID is simply the INDEX of the trigger in the guild settings
 */
export const deleteTrigger: Cmd = {
	tags: CmdTags.DisabledInDm + CmdTags.BotAdminRequired,
	aliases: ['removetrigger', '-trigger'],
	execute: (call: CmdCall) => {
		const argId = parseInt(call.args[0])
		if (isNaN(argId))
			return "Incorrect argument"

		if (call.guildSettings.triggers[argId])
			return ctx.guildSettingsService.deleteTrigger(call.msg.guildId!, argId)
		else
			throw 'No trigger with this ID. Use triggerlist to see yours triggers and their IDs'
	}
}