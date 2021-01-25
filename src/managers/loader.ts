import { botCache } from '../../main.ts'
import { Config } from '../class/class.ts'

// todo : make this a map<string,int> with pairs of dir and count loaded
let uniqueFilePathCounter = 0

// COMMANDS
export function loadCommands(): void {
	const path = './src/commands'
	loadPath(Deno.realPathSync(path))		
}

// HANDLERS
export function loadHandlers(): void {
	const path = './src/handlers'
	loadPath(Deno.realPathSync(path))
}

// CONFIG
export function loadConfig(): void{
	try {
		const config: Config = JSON.parse(Deno.readTextFileSync(Deno.realPathSync('./config/config.json')))
		botCache.config = config
	} catch (error){
		console.log(
			'\nError : config file could not be loaded \n' +
			`└ Make sure ${Deno.realPathSync('./')}/config/config.json exists and is correctly configured`
		)
		Deno.exit(0)
	}
}

export function loadPath(path: string): void {
	const files = Deno.readDirSync(Deno.realPathSync(path))

	uniqueFilePathCounter ++

	for (const file of files) {
		if (!file.name) continue
		const currentPath = `${path}/${file.name}`

		if (file.isFile) {
			import(`file:///${currentPath}#${uniqueFilePathCounter}`)
			continue
		}

		loadPath(currentPath)
	}
}