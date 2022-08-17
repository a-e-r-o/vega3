import { Sign } from "./horoscope.ts"

export abstract class Subscription {
	userId!: bigint
	channelId!: bigint

	timeslot!: string
	message!: string
	horoSign!: Sign
}