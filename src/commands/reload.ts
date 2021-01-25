// Types
import { Message, sendMessage } from '../../deps.ts'
import { CmdContext } from '../class/class.ts'
// cache
import { botCache } from '../../main.ts'
// managers
import { loadCommands, loadConfig, loadHandlers, loadPath } from '../managers/loader.ts'

botCache.commands.set('reload', {
	aliases: ['reload'],
	clearance: 0, 
	main: (cmdCtx: CmdContext) => {
		loadCommands()
		sendMessage(cmdCtx.msg.channelID, 'Reload complete')
	}
})