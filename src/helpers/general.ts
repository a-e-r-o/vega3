import { CmdCall, DiscordenoMessage } from '../mod.ts'

export function parseCommand(message: DiscordenoMessage, prefix: string): CmdCall {
	const args: string[] = message.content
		.replace(RegExp(`^${prefix}`,'i'),'')
		.trim()
		.split(' ')
		.filter(x => x !== ' ' && x !== '') 

	if (!message.channelId)
		message.channelId = 0n

	return {
		msg: message,
		args: args,
		cmd: strNormalize(args.shift() ?? ''),
		channel: message.channelId
	}
}

export function strNormalize(str: string) {
	return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace('é', 'e')
}

export function msToTime(ms: number) {
	const d = Math.floor(ms/86400000)
	ms -= d*86400000
	const h = Math.floor(ms/3600000)
	ms -= h*3600000
	const m = Math.floor(ms/60000)
	ms -= m * 60000
	const s = Math.floor(ms/1000)
	
	return `${d<10?'0'+d:d}:${h<10?'0'+h:h}:${m<10?'0'+m:m}:${s<10?'0'+s:s}`
}

export async function exists(path: string) {
	try {
		await Deno.stat(path)
		// successful, file or directory must exist
		return true
	} catch (error) {
		if (error && (error.name === Deno.errors.NotFound.name)) {
			// file or directory does not exist
			return false
		} else {
			// unexpected error, maybe permissions, pass it along
			throw error
		}
	}
}