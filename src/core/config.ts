import { parse } from "../../deps.ts";
import { Config, consts, exists } from "../mod.ts";

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
