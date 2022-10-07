import Datastore from 'https://deno.land/x/dndb@0.3.3/mod.ts'
import { DiscordenoMessage, Embed } from '../mod.ts'

export type Config = {
	token: string
	prefix: string
	clearances: Clearance[]
}

export type Clearance = {
	userId: string
	clearance: number
}

export type CmdCall = {
	channel: bigint
	msg: DiscordenoMessage
	msgStriped: string
	cmd: string
	args: string[]
}

export type Cmd = {
	disabled ?: boolean
	clearance ?: number
	aliases: string[]
	execute: (call: CmdCall) => Promise<Embed|string|void>|Embed|void|string
}

export type VegaDb = {
	horoDb: {
		subs: Datastore
	}
}