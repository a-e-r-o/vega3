import { sendMessage, botID } from '../../deps.ts'
import { CmdContext } from '../class/common.ts'
// cache
import { botCache } from '../../main.ts'

botCache.commands.set('invite', {
	aliases: ['invite','inv'],
	clearance: 0,
	main: (cmdCtx: CmdContext) => {
		sendMessage(cmdCtx.msg.channelID, `https://discordapp.com/oauth2/authorize?client_id=${botID}&scope=bot`)
	}
})