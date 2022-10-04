import { CmdCall, Config, DiscordenoMessage, exists, parse, strNormalize } from "../mod.ts"
import { Embed } from "../mod.ts";

const cfgPath = './config'
const defaultPrefix = 'vega'

/**
 * Check if config is present and not malformed. If so, returns a Config
 */
export async function loadConfig(): Promise<Config> {
	let ext = ''
	if (await exists(cfgPath+'.yaml')){
		ext = '.yaml'
	} 
	else if(await exists(cfgPath+'.yml')){
		ext = '.yml'
	}
	else {
		console.log('config.yml created. Edit it to add token and userId ')
		Deno.writeTextFileSync('config.yml', `token: \nprefix: ${defaultPrefix}\nclearances:\n  - clearance: 1\n    userId: ''#Important : put your discord user ID in between these quotes`);
		Deno.exit(0)
	}

	const config = parse(Deno.readTextFileSync(Deno.realPathSync(cfgPath+ext))) as Config
	if (!config.token)
		throw `\n!!! Missing or malformed token in config file`
	if (!config?.clearances[0]?.userId)
		throw `\n!!! Missing userId for clearances in config file`

	return config as Config
}

/**
 * Takes a message, parse it and returns a CmdCall
 */
export function parseCall(message: DiscordenoMessage, prefix: string): CmdCall {
	const msgNoPre = message.content.replace(RegExp(`^${prefix}`,'i'),'').trim()
	const args = msgNoPre.split(' ').filter(x => x !== ' ' && x !== '')
	const cmd = strNormalize(args.shift() ?? '')
	const msgStriped = msgNoPre.replace(cmd, '').trim()

	if (!message.channelId)
		message.channelId = 0n

	return {
		msg: message,
		msgStriped: msgStriped,
		args: args,
		cmd: cmd,
		channel: message.channelId
	}
}

/**
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

/**
 * Standard method to log an error in the command line
 */
export function vegaLog(...args: string[]){
	console.log(`~ Error caught, ${new Date().toString()}\n${args.join('\n')}`);
}