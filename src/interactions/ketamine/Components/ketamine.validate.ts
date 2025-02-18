import { ComponentInteractionHandler, Interaction } from "../../../../deps.ts";

export const validateHandler: ComponentInteractionHandler = {
	customID: '112229907884085659',
	type: 'button',
	handler: (i: Interaction)=> {
		if (i.message){
			i.message.delete()
		}
		i.message?.channel.send('Good job, here\'s your ketamine \n (*`2g`* of ketamine added to your inventory)')
	}
} 