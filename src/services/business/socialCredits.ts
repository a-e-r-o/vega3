import { socialCreditsDB } from "../../providers/local.ts";
import { Citizen } from '../../types/mod.ts'

export class SocialCreditsService {
	public store = socialCreditsDB

	constructor(){
	}

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