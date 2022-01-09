import { transactions } from "../../types/mod.ts"
import { IManager } from "../../types/mod.ts"

export class DongManager implements IManager {
	readonly key = 'dong'
	private transactions: transactions[]

	constructor(){
		this.transactions = []
	}
}

export const dongManager = new DongManager()