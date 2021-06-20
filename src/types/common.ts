import { EventHandlers } from '../../deps.ts'
import { DiscordenoMessage } from '../../deps.ts'

export interface BotCache {
	config: Config
	commands: Map<string, Command>
	// TODO make a manager type
	managers: Record<string, unknown>[]
	handlers: EventHandlers
	startTime: Date
}

export type CmdContext = {
	msg: DiscordenoMessage
	cmd: string
	args: string[]
	channel: bigint
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

