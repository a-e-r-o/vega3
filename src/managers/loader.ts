import { context } from '../../main.ts';

let uniqueFilePathCounter = 0;

export async function loadFiles() {
	let paths = [
		'./src/commands'
	]

	for(let i = 0; i < paths.length; i++){
		await loadPath(Deno.realPathSync(paths[i]));		
		uniqueFilePathCounter++;
	}
}

async function loadPath(path: string){
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