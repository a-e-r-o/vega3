import { sendMessage } from '../../deps.ts'
import { CmdContext, Command } from '../types/common.ts'
import { loadCommands } from '../helpers/loader.ts'
import { botCache } from "../../cache.ts"

const counters = {
	commands: 0,
	handlers: 0,
	managers: 0
}

export const cmd: Command = {
	aliases: ['reload'],
	clearance: 1, 
	main: async (cmdCtx: CmdContext) => {
		counters.commands += 1
		botCache.commands = await loadCommands(counters.commands)
		sendMessage(cmdCtx.msg.channelID, 'Reload complete')
	}
}