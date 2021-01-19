import { cache } from '../../main.ts';
import { Config } from '../class/class.ts';

// todo : make this a map<string,int> with pairs of dir and count loaded
let uniqueFilePathCounter = 0;

// COMMANDS
export async function loadCommands(): Promise<void> {
	let path = './src/commands'
	await loadPath(Deno.realPathSync(path));		
}

// HANDLERS
export async function loadHandlers(): Promise<void> {
	let path = './src/handlers'
	await loadPath(Deno.realPathSync(path));
}

// CONFIG
export async function loadConfig(): Promise<void>{
	try {
		let config: Config = JSON.parse(Deno.readTextFileSync(Deno.realPathSync('./config/config.json')))
		cache.config = config;
	} catch (error){
		console.log(
			'\nError : config file could not be loaded \n' +
			`└ Make sure ${Deno.realPathSync('./')}/config/config.json exists and is correctly configured`
		);
		Deno.exit(0);
	}
}

export async function loadPath(path: string): Promise<void> {
	let files = Deno.readDirSync(Deno.realPathSync(path));

	uniqueFilePathCounter ++;

	for (const file of files) {
		if (!file.name) continue;
		const currentPath = `${path}/${file.name}`;

		if (file.isFile) {
			import(`file:///${currentPath}#${uniqueFilePathCounter}`);
			continue;
		}

		loadPath(currentPath);
	}
}