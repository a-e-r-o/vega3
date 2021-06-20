import { DiscordenoMessage } from '../../deps.ts'
import { CmdContext } from "../types/common.ts"

export function parseCommand(message: DiscordenoMessage, prefix: string): CmdContext {
	if (message.content === undefined)
		message.content = ''

	const args: string[] = message.content
		.replace(RegExp(`^${prefix}`,'i'),'')
		.trim()
		.split(' ')
		.filter(x => x !== ' ' && x !== '') 

	if (!message.channelId)
		message.channelId = BigInt(0)

	return {
		msg: message,
		args: args,
		cmd: strLowNoAccents(args.shift() ?? ''),
		channel: BigInt(message.channelId)
	}
}


export function strLowNoAccents(str: string) {
	return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace('é', 'e')
}