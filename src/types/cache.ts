import * as Dcd from '../../deps.ts'
import { Config } from '../class/class.ts'
import { Command } from '../types/types.ts'

export interface BotCache {
	config: Config;
	commands: Map<String, Command>;
	managers: Array<Object>;
	handlers: Dcd.EventHandlers;
	startTime: Date;
}