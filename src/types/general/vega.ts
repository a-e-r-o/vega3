import { DiscordenoMessage, EventHandlers } from "../../deps.ts"

export type Ctx = {
	upTime: Date
	config: Cfg
	commands: Cmd[]
	handlers: EventHandlers
	services: Record<string, IManager>
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
	execute: (ctx: Ctx, cmdCtx: CmdCall) => void
}

export interface IManager {
	readonly key: string
}