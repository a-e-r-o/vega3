import { horoDB } from "../mod.ts";
import DataStore from "../../deps.ts"

export class HoroService {
	public HoroUsers: DataStore

	constructor(){
		this.HoroUsers = new DataStore({ filename:"./database/horo_users.db", autoload: true })
	}
}


/*
// CRUD / Citizen

public async newCitizen(userId: bigint): Promise<Citizen> {
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
}*/