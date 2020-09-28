// Types
import { Message, sendMessage } from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'
import { Call } from '../class/class.ts'
// cache
import { cache } from '../../main.ts'
// managers
import { loadCommands, loadConfig, loadHandlers, loadPath } from '../managers/loader.ts'

cache.commands.set('reload', {
	aliases: ['reload'],
	permission: [0], 
	main: async(call: Call) => {
		await loadCommands();
		sendMessage(call.msg.channel, 'Reload complete')
	}
})