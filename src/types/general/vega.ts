import { DiscordenoMessage, EventHandlers } from "../../deps.ts";

export type Ctx = {
	cmd: Cmd[]
	cfg: Cfg
	hdr: EventHandlers
	upTime: Date
	mng: Managers
}

export type Cfg = {
	token: string
	prefix: string
}

export type CmdCall = {
	msg: DiscordenoMessage
	cmd: string
	args: string[]
	channel: bigint
}

export type Cmd = {
	aliases: string[]
	clearance: number
	execute: (ctx: Ctx, cmdCtx: CmdCall) => void
}

export interface IManager {
	readonly key: string
}

export type Managers = {
    horoscope?: IManager
	dong?: IManager
}