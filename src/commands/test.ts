// Types
import { Message, sendMessage } from '../../deps.ts'
import { CmdContext } from '../class/class.ts'
// cache
import { botCache } from '../../main.ts'

botCache.commands.set('test', {
	aliases: ['test', 'tst', 'ping'],
	clearance: 0,
	main: (cmdCtx: CmdContext) => {
		// CmdContext : {command, arguments}
		sendMessage(cmdCtx.msg.channelID, 'test successful')
	}
})