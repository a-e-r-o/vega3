import { sendMessage, botID } from '../../deps.ts'
import { CmdContext, Command } from '../types/common.ts'

export const cmd: Command = {
	aliases: ['invite','inv'],
	clearance: 1,
	main: (cmdCtx: CmdContext) => {
		sendMessage(cmdCtx.msg.channelID, `https://discordapp.com/oauth2/authorize?client_id=${botID}&scope=bot`)
	}
}