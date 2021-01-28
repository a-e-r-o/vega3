import { EventHandlers } from '../../deps.ts'
import { Config } from '../class/common.ts'
import { CmdContext } from "../class/common.ts"

export interface BotCache {
	config: Config
	commands: Map<string, Command>
	// TODO make a manager type
	managers: Record<string, unknown>[]
	handlers: EventHandlers
	startTime: Date
}

export interface Command {
	aliases: string[]
	clearance: number
	main: (cmdCtx: CmdContext) => void
}

export interface vegaMsgOptions {
	txtColor?: string
	embColor?: string
	timeOut?: number
	format?: string
}