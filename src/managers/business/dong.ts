import { read, write } from "../../helpers/mod.ts";
import { transactions } from "../../types/mod.ts";
import { IManager } from "../../types/mod.ts";

export class DongManager implements IManager {
	readonly key = 'dong'
	private transactions: transactions[]

	constructor(){
		this.transactions = []
		//let a = read(this.key) as transactions[]
		//console.log(a)
		//write(this.key, 'sample verif 1')
		//Deno.exit()
	}
}