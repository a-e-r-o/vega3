import { v, ActivityTypes, editBotStatus } from '../mod.ts'

export function ready(){
	// Clear terminal
	Deno.stdout.writeSync(new TextEncoder().encode('\x1b[H\x1b[J'))

	console.log('/// [ Service Online ] ///')
	
	editBotStatus(
		v,
		{
			status: 'online', 
			activities: [
				{
					createdAt: (new Date()).getTime(),
					type: ActivityTypes.Custom,
					name: `Si le savoir est une arme et bah nique ta mère`
				}
			]
		}
	)
}