import { Message } from '../../deps.ts'

export class CmdContext {
	public msg: Message
	public cmd: string
	public args: string[]

	constructor (message: Message, prefix: string) {
		this.msg = message
		const args = this.parseArgs(message.content, prefix)
		this.cmd = args.shift() || ''
		this.args = args
	}

	private parseArgs(content: string, prefix: string): string[] {
		return content
			.replace(RegExp(`^${prefix}`,'i'),'')
			.trim()
			.split(' ')
			.filter(x => x !== ' ' && x !== '')
	}
}

export class Config {
	public token!: string
	public prefix!: string
	// temporary solution until implementation of a better clearance system
	public botAdmins!: string[]
}

export class ExError {
	public message: string

	constructor (msg: string) {
		this.message = msg
	}
}