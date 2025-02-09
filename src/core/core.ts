import { Message, parse } from '../../deps.ts';
import { CommandCall, Config, consts, exists, strNormalize, GuildSettings } from '../mod.ts'

/** 
 * Check if config is present and not malformed. If so, returns a Config 
 */
export async function loadConfig(): Promise<Config> {
	// Check if config file exists
	if (!(await exists(consts.cfgPath)))
		throw `\n! Missing config.yml ; see README.MD to learn more`

	const config = parse(Deno.readTextFileSync(Deno.realPathSync(consts.cfgPath))) as Config

	// Token is required
	if (!config.token)
		throw `\n! Missing token in config`

	// Default prefix if missing from config
	if (config.prefix === undefined || config.prefix === '')
		config.prefix = consts.defaultPrefix

	// Empty admin list as default
	if (!config.admins)
		config.admins = []

	return config as Config
}

/** 
 * Takes a message, parse it and returns a CommandCall 
 */
export function parseCall(message: Message, prefix: string, guildSettings: GuildSettings): CommandCall {
	const msgNoPre = message.content.replace(RegExp(`^${prefix}`,'i'),'').trim()
	const args = msgNoPre.split(' ').filter(x => x !== ' ' && x !== '')
	const cmd = strNormalize(args.shift() ?? '')
	const msgStriped = msgNoPre.replace(cmd, '').trim()

	if (!message.channelID)
		message.channelID = ''

	return {
		msg: message,
		msgStriped: msgStriped,
		args: args,
		cmd: cmd,
		channel: message.channelID,
		guildSettings: guildSettings
	}
}

/** 
 * USED IN 'RANDOM' COMMANDS
 * Parse the index and content of a description if found
 */
export function parseDesc(args: string[]): string {
	// If first char of an arg is a dash, consider the first beginning of the description
	let desc = ''
	const descIndex: number = args.findIndex(x => x.match(/^--/))

	// If there is a desc, it is the one beginning with a dash and all the ones after it
	if (descIndex >= 0) {
		// remove the separator from the arg to have a clean desc
		if (args[descIndex] === '--') {
			// if it's only the separator by itself remove the arg altogether
			args.splice(descIndex, 1)
		} else {
			// else, remove the separator from the arg
			args[descIndex] = args[descIndex].replace(/^--/, '')
		}

		// join all args following the one with the separator
		desc = 
			args
				.splice(descIndex, args.length - descIndex)
				.join(' ')
	}
	return desc
}

