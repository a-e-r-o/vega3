import { CmdCall, Config, DiscordenoMessage, exists, parse, strNormalize } from "../mod.ts"
import { Embed } from "../mod.ts";

const path = './config'
const defaultPrefix = 'vega'

/**
 * Check if config is present and not malformed. If so, returns a Config
 */
export async function loadConfig(): Promise<Config> {
	let ext = ''
	if (await exists(path+'.yaml')){
		ext = '.yaml'
	} 
	else if(await exists(path+'.yml')){
		ext = '.yml'
	}
	else {
		console.log('config.yml created. Edit it to add token and userId ')
		Deno.writeTextFileSync('config.yml', `token: \nprefix: ${defaultPrefix}\nclearances:\n  - clearance: 1\n    userId: ''#Important : put your discord user ID in between these quotes`);
		Deno.exit(0)
	}

	const config = parse(Deno.readTextFileSync(Deno.realPathSync(path+ext))) as Config
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
	const args: string[] = message.content
		.replace(RegExp(`^${prefix}`,'i'),'')
		.trim()
		.split(' ')
		.filter(x => x !== ' ' && x !== '') 

	if (!message.channelId)
		message.channelId = 0n

	return {
		msg: message,
		args: args,
		cmd: strNormalize(args.shift() ?? ''),
		channel: message.channelId
	}
}

/**
 * Takes a sting, returns it in an an embed formatted as error
 */
export function formatErr(input: string){
	const embed: Embed = {
		color: 15087872,
		description: `\`\`\`diff\n-${input}\`\`\``
	}
	return {embeds: [embed]}
}

/**
 * Takes a sting, returns it in an an embed formatted as error
 */
export function formatWarn(input: string){
	const embed: Embed = {
		title: 'Command failed',
		color: 14971947,
		description: input
	}
	return {embeds: [embed]}
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