import { Message } from '../../deps.ts'
import { CmdContext } from "../types/common.ts"

export function parseCommand(message: Message, prefix: string): CmdContext {
	const args: string[] = message.content
		.replace(RegExp(`^${prefix}`,'i'),'')
		.trim()
		.split(' ')
		.filter(x => x !== ' ' && x !== '')

	return {
		msg: message,
		args: args,
		cmd: strLowNoAccents(args.shift() ?? '')
	}
}


export function strLowNoAccents(str: string) {
	return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace('é', 'e')
}