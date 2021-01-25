// Types
import { Message, sendMessage } from '../../deps.ts'
import { CmdContext } from '../class/class.ts'
// cache
import { botCache } from '../../main.ts'

botCache.commands.set('shutdown', {
	aliases: ['shutdown', 'exit(0)'],
	clearance: 1,
	main: async(cmdCtx: CmdContext) => {
		await sendMessage(cmdCtx.msg.channelID, '__**/!\\ Emergency shutdown engaged /!\\**__')
		Deno.exit(0)
	}
})