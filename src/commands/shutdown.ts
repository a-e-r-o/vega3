import { sendMessage } from '../../deps.ts'
import { CmdContext } from '../types/common.ts'
import { Command } from "../types/common.ts"

export const cmd: Command = {
	aliases: ['shutdown', 'exit(0)'],
	clearance: 1,
	main: async(cmdCtx: CmdContext) => {
		await sendMessage(cmdCtx.msg.channelID, ':warning: **Emergency shutdown engaged** :warning:')
		Deno.exit(0)
	}
}