import { CmdContext } from "../class/class.ts";

export interface Command {
	aliases: string[]
	clearance: number
	main: (cmdCtx: CmdContext) => void
}