import { cache } from '../../main.ts';
import { Config } from '../types/configSchema.ts';

let uniqueFilePathCounter = 0;

export async function loadFiles(): Promise<void> {
	let paths = [
		'./src/commands'
	]

	for(let i = 0; i < paths.length; i++){
		await loadPath(Deno.realPathSync(paths[i]));		
		uniqueFilePathCounter++;
	}
}

async function loadPath(path: string): Promise<void> {
	let files = Deno.readDirSync(Deno.realPathSync(path));

	for (const file of files) {
		if (!file.name) continue;
		const currentPath = `${path}/${file.name}`;

		if (file.isFile) {
			await import(`file:///${currentPath}#${uniqueFilePathCounter}`);
			continue;
		}

		loadPath(currentPath);
	}
}

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