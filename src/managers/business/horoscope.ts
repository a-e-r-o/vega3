import { IManager, subscription } from "../../types/mod.ts";

export class HoroManager implements IManager {
	readonly key = 'horo'
	private subscriptions: subscription[]

    constructor(){
        this.subscriptions = []
    }
}