import { CmdCall, Embed, getHoroscopeContent, HosoSubscriptionDto, msToReadableDuration, msUntilTimeSlot, parseStrTimeSlot, readableTime, routes, Sign, signs } from '../mod.ts'
import { ctx } from "../../main.ts";
import DataStore from "../../deps.ts"

type hosoSubscription = {
	call: CmdCall
}

export class HoroService {
	public timeOuts:[] = []
	public subs: DataStore

	constructor(){
		this.subs = new DataStore({ filename:"./.database/subs.db", autoload: true })
	}

	newSub(call: CmdCall, horosign: Sign | null = null): Embed {
		// parse time slot here
		// if no time slot specified, use current hours and minute
		const route = routes[1]
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

		const newSub: HosoSubscriptionDto = {
			channel: call.channel.toString(),
			user: call.msg.authorId.toString(),
			sign: sign,
			timeslot: timeSlot
		}

		this.subs.insert(newSub);

		// TODO check if user already has a subscription. If so, remove it before inserting

		//commandList.horoscope.execute(call)
		return {
			color: parseInt(sign.color, 16),
			description: `Subscribed to daily horoscope for sign *${sign.fr}* at ${readableTime(timeSlot[0], timeSlot[1])} (in ${msToReadableDuration(timeTo)})`
		}
	}

	unsub(call: CmdCall): Embed {
		this.subs.removeOne({user: call.msg.authorId})
		return {description: 'Successfuly unsubscribed'}
	}
}


/*
export class dbService {
	private store = ""

	public async insertCitizen(userId: bigint): Promise<Citizen> {
		const newUsr: Citizen = {
			citizenId: userId.toString(),
			score: 0
		}
		await this.store.users.insert(newUsr)
		return newUsr
	}
	
	public async getCitizen(userId: bigint): Promise<Citizen> {
		const dbUser = (await this.store.users.find({citizenId: userId.toString()}) as Citizen[])[0]
		return dbUser ? dbUser : this.newCitizen(userId)
	}
	
	public async updateCitizen(citizen: Citizen){
		await this.store.users.update({citizenId: citizen.citizenId}, {$set: {score: citizen.score} })
	}
	
	// CRUD / TriggerLogs
	
	public async newTriggerLog(userId: bigint, triggerId: string): Promise<TriggerLog> {
		const newLog: TriggerLog = {
			citizenId: userId.toString(),
			triggerId: triggerId,
			timestamp: (new Date).getTime(),
			factor: 0,
		}
		await this.store.triggerLogs.insert(newLog)
		return newLog
	}
	
	public async getTriggerLog(userId: bigint, triggerId: string): Promise<TriggerLog> {
		const log = (await this.store.triggerLogs.find({citizenId: userId.toString(), triggerId: triggerId}) as TriggerLog[])[0]
		return log ? log : this.newTriggerLog(userId, triggerId)
	}
	
	public async updateTriggerLog(triggerLog: TriggerLog){
		await this.store.triggerLogs.update({citizenId: triggerLog.citizenId, triggerId: triggerLog.triggerId}, {$set: {factor: triggerLog.factor, timestamp: triggerLog.timestamp} })
	}
	
	// Operations
	
	public async transferCredits(giver: Citizen, receiver: Citizen, amount: number){
		const hasProvisions = giver.score > amount
		if (!hasProvisions)
			throw `I'm sorry to inform you do not have enough social credits to carry this transaction.`
	
		// update giver and receiver in DB
		giver.score -= amount
		receiver.score += amount
		await this.updateCitizen(giver)
		await this.updateCitizen(receiver)
	}
}
*/