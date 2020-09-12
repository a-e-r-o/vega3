import { Config, Command } from '../types/types.ts'
import * as Discord from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'

export interface BotCache {
	config: Config;
	commands: Array<Command>;
	managers: Array<Object>;
	handlers: Discord.EventHandlers;
}