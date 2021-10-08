import { parse } from "../../deps.ts";
import { Cfg } from "../../types/mod.ts";

const path = './config/config.yml'
const defaultPrefix = 'v '

export function loadConfig(): Cfg {
	try {
		const config = parse(Deno.readTextFileSync(Deno.realPathSync(path))) as Cfg
		if (!configIsFine(config))
			throw new Error('malformed')
		
		return config
	} 
	catch (err) {
		if (err.message == 'malformed') {
			throw new Error('Malformed config file')
		}
		else {
			throw new Error(`Missing config file`)
		}
		
	}
}

function configIsFine(config: Cfg): boolean {
	// If there are more keys in the future, todo : iterator to check each key
	if (
		config.token == null ||
		config.token == undefined ||
		config.token == '' ||
		config.token.length < 59 // todo : verify is length is variable
		){
			return false
		}
		
		if (
			config.prefix == null ||
			config.prefix == undefined ||
			config.prefix == ''
			){
				config.prefix = defaultPrefix
			}
			
			return true
		}