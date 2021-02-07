import { sendMessage } from '../../deps.ts'
import { Command, CmdContext } from "../types/common.ts"

export const cmd: Command = {
	aliases: ['test', 'tst', 'ping'],
	clearance: 0,
	main: (cmdCtx: CmdContext) => {
		sendMessage(cmdCtx.msg.channelID, 'test successful')
	}
}