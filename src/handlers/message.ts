// Libs
import { sendMessage, Message } from 'https://deno.land/x/discordeno@v8.0.0/mod.ts';
// cache
import { cache } from '../../main.ts'
import { Call, Command } from '../class/class.ts';

cache.handlers.messageCreate = (message: Message) => {
	// if message is not a command, do nothing
	if (!message.content.match(RegExp(cache.config.prefix, 'gi'))) {
		return
	}

	let cmdName = message.content.replace(RegExp(cache.config.prefix, 'gi'), '');
	let command: Command | undefined = 
		Array
				.from(cache.commands.values())
				.find(
					(cmd: Command) => cmd.aliases.includes(cmdName)
				);

	if (command !== undefined) {
		command.main(message, new Call(message));
	}
}