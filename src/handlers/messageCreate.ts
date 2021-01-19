// Libs
import { sendMessage, Message } from '../../deps.ts';
// cache
import { cache } from '../../main.ts'
import { Call } from '../class/class.ts';
import { Command } from '../types/types.ts';

cache.handlers.messageCreate = (message: Message) => {
	// if author is a bot
	if (message.author.bot) {
		return
	}
	// if message is not a command, do nothing
	if (!message.content.match(RegExp(cache.config.prefix, 'gi'))) {
		return
	}

	let call: Call = new Call(message, cache.config.prefix);

	let command: Command | undefined = 
		Array
			.from(cache.commands.values())
			.find(
				(cmd: Command) => cmd.aliases.includes(call.cmd)
			);

	if (!command)
		return
	// temporary solution until implementation of a better clearance system
	if (command.clearance > 0 && !cache.config.botAdmins.includes(call.msg.author.id)){
		sendMessage(call.msg.channelID, 'Insufficient user clearance level')
		return false
	}

	command.main(call);
}