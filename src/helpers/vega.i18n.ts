import { Language, strings } from "../mod.ts";

export function getStr(lang: Language, id: number, ...args: string[]){
	// If string id does not exist, return default : string no found
	if (!strings[id])
		return formatStr(strings[1024][lang], id.toString())

	// If string id > 512 it is meant to be a template
	if (id > 512)
		return formatStr(strings[id][lang], ...args)

	return strings[id][lang]
}

export function formatStr(str: string, ...args: string[]) {
	return str.replace(/{([0-9]+)}/g, (match, index)=>{ return args[index] ?? match })
}