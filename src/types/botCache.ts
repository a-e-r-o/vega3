import { EventHandlers } from '../../deps.ts'
import { Config } from '../class/class.ts'
import { Command } from '../types/types.ts'

export interface BotCache {
	config: Config
	commands: Map<string, Command>
	// TODO make a manager type
	managers: Record<string, unknown>[]
	handlers: EventHandlers
	startTime: Date
}