import { EventHandlers } from '../../deps.ts'
import { Message } from '../../deps.ts'

export interface BotCache {
	config: Config
	commands: Map<string, Command>
	// TODO make a manager type
	managers: Record<string, unknown>[]
	handlers: EventHandlers
	startTime: Date
}

export type CmdContext = {
	msg: Message
	cmd: string
	args: string[]
}

export type Command = {
	aliases: string[]
	clearance: number
	main: (cmdCtx: CmdContext) => void
}

export type Config = {
	token: string
	prefix: string
	// temporary solution until implementation of a better clearance system
	botAdmins: string[]
}

