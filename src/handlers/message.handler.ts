// Libs
import { sendMessage, Message } from 'https://deno.land/x/discordeno@v8.0.0/mod.ts';
// cache
import { cache } from '../../main.ts'

cache.handlers.messageCreate = (message: Message) => {
	if (message.content.match(/^ping$/)) {
		console.log(message);
		sendMessage(message.channel, 'pong')
	}
}