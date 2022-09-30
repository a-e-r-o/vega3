import { CmdCall, Embed, getHoroscopeContent, HosoSubscriptionDto, msToReadableDuration, msUntilTimeSlot, parseStrTimeSlot, readableTime, routes, Sign, signs } from '../mod.ts'
import DataStore, { sendMessage } from "../../deps.ts"

export class HoroService {
	public timeOuts: Record<string, number> = {}
	public store: DataStore

	constructor(){
		this.store = new DataStore({ filename:"./.database/subs.db", autoload: true })
		this.store.loadDatabase();

		this.recoverTimers()
	}

	/**
	 * Command used on initialization (after a reboot). 
	 * Iterates over the entries in the database to create corresponding timeouts
	 */
	async recoverTimers(){
		const subs: HosoSubscriptionDto[] = (await this.store.find({})) as HosoSubscriptionDto[]
		subs?.forEach(x => {
			this.initTimeOut(x)
		});
	}

	/**
	 * Creates a new subscription : parses call and if correct, creates timeout, creates sub entry in database
	 */
	newSub(call: CmdCall, horosign: Sign | null = null): Embed {
		// parse time slot here
		// if no time slot specified, use current hours and minute
		const sign = horosign || signs[1]
		let timeSlot: number[]
		let timeTo: number

		// If there is a timeslot argument
		if (call.args[2]){
			const argTimeSlot = parseStrTimeSlot(call.args[2])
			// Case of correct timeslot
			if (argTimeSlot.length == 2) {
				timeSlot = argTimeSlot
				timeTo = msUntilTimeSlot(argTimeSlot[0], argTimeSlot[1])
			} 
			// Case of incorrect timeslot specified
			else {
				throw 'Incorrect time slot specified. Please use the following format: `hh:mm`'
			}
		} 
		// If there is not timeslot specified
		else {
			// Use default timeslot
			timeSlot = parseStrTimeSlot(`${new Date().getHours()}:${new Date().getMinutes()}`)
			timeTo = msUntilTimeSlot(timeSlot[0], timeSlot[1])
		}

		// Build horo sub object
		const newSub: HosoSubscriptionDto = {
			channelId: call.channel.toString(),
			userId: call.msg.authorId.toString(),
			signId: sign.id,
			timeslot: timeSlot
		}

		// To avoid duplicate timeouts in memory
		clearTimeout(this.timeOuts[call.msg.authorId.toString()])
		delete this.timeOuts[call.msg.authorId.toString()]
		// Removes any pre-existing subscription for this user
		this.store.removeOne({userId: call.msg.authorId.toString()});
		// Inser new subscription
		this.store.insert(newSub)
		// Init timeout in memory
		this.initTimeOut(newSub)

		return {
			color: parseInt(sign.color, 16),
			description: `Subscribed to daily horoscope for sign *${sign.fr}* at ${readableTime(timeSlot[0], timeSlot[1])} (in ${msToReadableDuration(timeTo)})`
		}
	}

	/**
	 * Cancel subscription, stops running timeout and clears entry in database
	 */
	unsub(call: CmdCall): Embed {
		const timeoutForUser = this.timeOuts[call.msg.authorId.toString()]

		// Check if user has an active subscription
		if (!timeoutForUser)
			return {description: 'You don\'t have any active horo subscription'}

		// Clear subsription : clear timeout, remove sub from memory, then remove sub from database
		clearTimeout(this.timeOuts[call.msg.authorId.toString()])
		delete this.timeOuts[call.msg.authorId.toString()]
		this.store.removeOne({userId: call.msg.authorId.toString()})
		
		return {description: 'Successfuly unsubscribed'}
	}

	/**
	 * Creates timeout in memory
	 */
	initTimeOut(sub: HosoSubscriptionDto) {
		// Add Timeout in memory
		this.timeOuts[sub.userId] = setTimeout(async() => {
			// Send content
			sendMessage(
				BigInt(sub.channelId),
				{ 
					content: `<@!${sub.userId}> Here is your daily horoscope`,	
					embeds: [await getHoroscopeContent(signs[sub.signId], routes[0])]
				}
			)
			// When this timeout executes, call this same function again to continue the cycle
			this.initTimeOut(sub)
		}, msUntilTimeSlot(sub.timeslot[0], sub.timeslot[1]));
	}
}