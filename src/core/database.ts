import { ensureDirSync } from "../../deps.ts";
import { clearDir, consts, vegaLog } from "../mod.ts";


/**
 * Ensures folders for local database
 */
export function initLocalDb() {
	ensureDirSync(consts.dbDir)
	ensureDirSync(consts.dbDir + '/guildSettings')
}

/**
 * Ensures or clears folder for temp files
 */
export async function initTemp(){
	// Ensure and clears temp folder
	ensureDirSync(consts.tmpDir)
	await clearDir(consts.tmpDir)
}

/**
 * Read a file and returns the collection of objects within
 */
export function readSet(collectionId: string, folder = ''){
	try {
		let value: string

		if (folder)
			value = Deno.readTextFileSync(`${consts.dbDir}/${folder}/${collectionId}`)
		else 
			value = Deno.readTextFileSync(`${consts.dbDir}/${collectionId}`)

		return JSON.parse(value) as unknown[]
	}
	catch(err) {
		// Normal behaviour if file does not exist; no data to return
		return []
	}
}

/**
 * Read all collections files in the specified folder
 */
export function readFolderSets(folder: string){
	const res = []
	const files = Deno.readDirSync(`${consts.dbDir}/${folder}`)

	for (const file of files) {
		if (!file.isDirectory)
			res.push(readSet(file.name, folder)[0])
	}

	return res
}

/**
 * Save a collection of objects in a file
 */
export function saveSet(collectionId: string, collection: unknown[], folder = ""){
	try {
		const data = JSON.stringify(collection)
		if (folder)
			Deno.writeTextFileSync(`${consts.dbDir}/${folder}/${collectionId}`, data)
		else
			Deno.writeTextFileSync(`${consts.dbDir}/${collectionId}`, data)
		return true
	}
	catch(err) {
		// Error saving
		vegaLog(`Error saving collection : ${collection}`)
		return false
	}
}