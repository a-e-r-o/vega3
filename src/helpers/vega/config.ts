import { parse } from "../../deps.ts"
import { Cfg } from "../../types/mod.ts"
import { exists } from './general.ts'

const path = './config'
const defaultPrefix = 'vega'

export async function loadConfig(): Promise<Cfg> {
	let ext = ''
	if (await exists(path+'.yaml')){
		ext = '.yaml'
	} 
	else if(await exists(path+'.yml')){
		ext = '.yml'
	}
	else {
		console.log('\nError : Missing config file.\nCreate a config.yml file at the root of the project directory following the structure indicated in the readme.md')
		Deno.exit(0)
	}

	const config = parse(Deno.readTextFileSync(Deno.realPathSync(path+ext))) as Cfg
	if (!configIsFine(config)){
		console.log('\nError : Malformed config file.\nPlease follow the structure indicated in the readme.md')
		Deno.exit(0)
	} 
	return config
}

function configIsFine(config: Cfg): boolean {
	if (config == undefined){
		return false
	}
	
	// If there are more keys in the future, todo : iterator to check each key
	if (
		config.token == undefined ||
		config.token == ''
	){
		return false
	}
		
	if (
		config.prefix == undefined ||
		config.prefix == ''
	){
		config.prefix = defaultPrefix
	}

	if (
		config.clearances == undefined
	){
		config.clearances = []
	}
	
	return true
}