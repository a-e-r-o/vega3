import { consts, dbCollections, vegaLog } from "../../mod.ts";

export function readSet(collName: dbCollections){
	try {
		const value = Deno.readTextFileSync(`${consts.dbDir}/${collName}`)
		return JSON.parse(value) as unknown[]
	}
	catch(err) {
		// Normal behaviour, file does not exist; no data to return
		return []
	}
}

export function saveSet(collName: dbCollections, collection: unknown[]){
	try {
		const data = JSON.stringify(collection)
		Deno.writeTextFileSync(`${consts.dbDir}/${collName}`, data)
		return true
	}
	catch(err) {
		// Error saving
		vegaLog(err)
		return false
	}
}