import { consts } from '../mod.ts'

export async function getCollection(colName: string): Promise<Record<string, unknown> | unknown[]> {
	const txt = await Deno.readTextFile(`${consts.dbDir}/${colName}`)
	return JSON.parse(txt)
}

export async function saveCollection(colName: string, colValue: Record<string, unknown> | unknown[]): Promise<boolean> {
	try {
		await Deno.writeTextFile(`${consts.dbDir}/${colName}`, JSON.stringify(colValue))
		return true
	}
	catch {
		return false
	}
}