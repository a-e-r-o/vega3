import { sendMessage } from '../../deps.ts'
import { CmdContext, Command } from '../types/common.ts'

export const cmd: Command = {
	aliases: ['help', 'h'],
	clearance: 0,
	main: (cmdCtx: CmdContext) => {
		sendMessage(cmdCtx.msg.channelID, '`// todo` :smile:')
	}
}