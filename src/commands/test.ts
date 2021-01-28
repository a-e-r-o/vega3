// Types
import { sendMessage } from '../../deps.ts'
import { CmdContext } from '../class/common.ts'
// cache
import { botCache } from '../../main.ts'

botCache.commands.set('test', {
	aliases: ['test', 'tst', 'ping'],
	clearance: 0,
	main: (cmdCtx: CmdContext) => {
		sendMessage(cmdCtx.msg.channelID, 'test successful')
	}
})