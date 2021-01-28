// Types
import { sendMessage } from '../../deps.ts'
import { CmdContext } from '../class/common.ts'
// cache
import { botCache } from '../../main.ts'

botCache.commands.set('help', {
	aliases: ['help', 'h'],
	clearance: 0,
	main: (cmdCtx: CmdContext) => {
		sendMessage(cmdCtx.msg.channelID, '`// todo` :smile:')
	}
})