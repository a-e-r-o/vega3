import { v, CmdCall, sendMessage, getHoroscopeContent, HoroSubscription, HoroSubscriptionDto, msToReadableDuration, msUntilTimeSlot, parseStrTimeSlot, readableTime, Sign, signs, readSet, saveSet, BotWithCache, horoRoutes } from '../mod.ts'

export class HoroService {
	suubs: Record<string, HoroSubscription> = {}

	constructor(){
		const dbSubs = readSet('horoSubs') as HoroSubscriptionDto[]
		dbSubs.forEach(sub => {
			this.suubs[sub.userId] = sub
			this.initTimeOut(sub)
		})
	}

	/**
	 * Convert subs into a collection and save it in a local file
	 */
	saveInDb(){
		const subsArr = []
		for (const sub in this.suubs) {
			if (Object.prototype.hasOwnProperty.call(this.suubs, sub)) {
				subsArr.push(this.suubs[sub]);
			}
		}
		saveSet('horoSubs', subsArr)
	}

	/**
	 * Creates a new subscription : parses call and if correct, creates timeout, creates sub entry in database
	 */
	newSub(call: CmdCall, horosign: Sign | null = null): string {
		const subId = call.msg.authorId.toString()

		if (this.suubs[subId])
			throw 'You already have an active horo subscription. Please unsubscribe before creating another one'

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
		const newSub: HoroSubscriptionDto = {
			channelId: call.channel.toString(),
			userId: call.msg.authorId.toString(),
			signId: sign.id,
			timeslot: timeSlot
		}

		// Insert new sub in memory
		this.suubs[subId] = newSub
		// Save in DB
		this.saveInDb()
		// Init timeout in memory
		this.initTimeOut(newSub)

		return `Subscribed to daily horoscope for sign **${sign.fr}** at **${readableTime(timeSlot[0], timeSlot[1])}** (in ${msToReadableDuration(timeTo)})`
	}

	/**
	 * Stops timeout loop, delete it from memory and database
	 */
	unsub(call: CmdCall): string {
		const subId = call.msg.authorId.toString()
		// Check if subscription exists
		if (!this.suubs[subId])
			throw 'You don\'t have any active horo subscription'
		// Cancel timeout
		clearTimeout(this.suubs[subId].timeOutId)
		// Delete in memory
		delete this.suubs[subId]
		// Delete in database
		this.saveInDb()

		return 'Successfuly unsubscribed'
	}

	/**
	 * Creates timeout in memory
	 */
	private initTimeOut(sub: HoroSubscriptionDto) {
		// Add Timeout in memory
		this.suubs[sub.userId].timeOutId = setTimeout(async() => {
			// Send content
			sendMessage(
				v,
				BigInt(sub.channelId),
				{ 
					content: `<@!${sub.userId}> Here is your daily horoscope`,	
					embeds: [await getHoroscopeContent(signs[sub.signId], horoRoutes[1])]
				}
			)
			this.initTimeOut(sub)
			// When this timeout executes, call this same function again to continue the cycle
		}, msUntilTimeSlot(sub.timeslot[0], sub.timeslot[1]))
	}
}