import * as Discord from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'
import { Command, Config } from '../class/class.ts'

export interface BotCache {
	config: Config;
	commands: Map<String, Command>;
	managers: Array<Object>;
	handlers: Discord.EventHandlers;
	startTime: Date;
}