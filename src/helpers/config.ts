import { Cfg, exists, parse } from "../mod.ts"

const path = './config'
const defaultPrefix = 'vega'
const parameters = [
	'token',

]

export async function loadConfig(): Promise<Cfg> {
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

	const config = parse(Deno.readTextFileSync(Deno.realPathSync(path+ext))) as Cfg
	if (!config.token)
		throw `\n!!! Missing or malformed token in config file`
	if (!config?.clearances[0]?.userId)
		throw `\n!!! Missing userId for clearances in config file`

	return config as Cfg
}