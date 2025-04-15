import { CONTEXT } from '../../../main.ts'
import { Command, CommandCall, CommandTags } from '../../mod.ts'

/**
 * List all triggers for the current guild, with their IDs (needed to delete them)
 */
export const listTrigger: Command = {
	tags: CommandTags.DisabledInDm + CommandTags.BotAdminRequired,
	aliases: ['triggerlist', 'triggers'],
	execute: async(call: CommandCall) => {
		const list = await CONTEXT.guildSettingsService.getTriggerList(call.message.guildID!)
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
export const addTrigger: Command = {
	tags: CommandTags.DisabledInDm + CommandTags.BotAdminRequired,
	aliases: ['addtrigger', '+trigger'],
	execute: async(call: CommandCall) => {
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
			throw `Malformed argument \`${error}\``
		}

		const triggerId = await CONTEXT.guildSettingsService.addTrigger(call.message.guildID!, regex, response, regexOptions)
		// If id is -1, an error occurred
		if (triggerId >= 0)
			return `Successfully added trigger \`${regex}\` with ID \`${triggerId}\``
		else
			throw 'An error occurred, failed to remove trigger'
	}
}

/**
 * Delete a trigger based on its ID. The ID is simply the INDEX of the trigger in the guild settings
 */
export const deleteTrigger: Command = {
	tags: CommandTags.DisabledInDm + CommandTags.BotAdminRequired,
	aliases: ['removetrigger', '-trigger'],
	execute: async(call: CommandCall) => {
		const argId = parseInt(call.args[0])
		if (isNaN(argId))
			return "Incorrect argument"

		if (!call.guildSettings.triggers[argId])
			throw 'No trigger with this ID. Use triggerlist to see yours triggers and their IDs'
		
		if (await CONTEXT.guildSettingsService.deleteTrigger(call.message.guildID!, argId))
			return `Successfully removed trigger with ID \`${argId}\``
		else
			throw 'An error occurred, failed to add trigger'
	}
}