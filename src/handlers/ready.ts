import { DiscordActivityTypes, editBotStatus } from '../mod.ts'

export function ready(){
	// Clear terminal
	Deno.stdout.writeSync(new TextEncoder().encode('\x1b[H\x1b[J'))

	console.log('/// [ Service Online ] ///')
	
	editBotStatus(
		{
			status: 'online', 
			activities: [
				{
					createdAt: (new Date()).getTime(),
					type: DiscordActivityTypes.Listening,
					name: `Human music`
				}
			]
		}
	)
}