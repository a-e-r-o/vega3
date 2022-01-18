import { DiscordenoMessage, Embed, EventHandlers } from '../../deps.ts'

export type Ctx = {
	upTime: Date
	config: Cfg
	commands: Cmd[]
	handlers: EventHandlers
}

export type Cfg = {
	token: string
	prefix: string
	clearances: Clearance[]
}

export type Clearance = {
	userId: string
	clearance: number
}

export type CmdCall = {
	msg: DiscordenoMessage
	cmd: string
	args: string[]
	channel: bigint
}

export type Cmd = {
	disabled ?: boolean
	clearance ?: number
	aliases: string[]
	execute: (ctx: Ctx, cmdCtx: CmdCall) => Promise<Embed|void>|Embed|void
}