import { ComponentInteractionHandler, Interaction } from "../../../../deps.ts";

export const validateHandler: ComponentInteractionHandler = {
	customID: 'DummyValidateButtonClick',
	type: 'button',
	handler: (i: Interaction)=> {
		if (i.message){
			i.message.delete()
		}
		i.message?.channel.send('Good job, here\'s a thumbs up 👍')
	}
} 