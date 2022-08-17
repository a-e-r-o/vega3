import { HoroService, DiscordenoMessage, Embed, EventHandlers } from "../mod.ts";

export type Ctx = {
	upTime: Date
	config: Cfg
	services: Services
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
	execute: (cmdCtx: CmdCall) => Promise<Embed|void>|Embed|void
}

export type Services = {
	horoService: HoroService
}