import { v, ActivityTypes, editBotStatus } from '../mod.ts'

export function ready(){
	// Clear terminal
	Deno.stdout.writeSync(new TextEncoder().encode('\x1b[H\x1b[J'))

	console.log('/// [ Service Online ] ///')

	setQuote()
	// New quote every 3 hours
	setInterval( ()=>{ setQuote() }, 10800000)

	async function setQuote(){
		const response = await (await fetch(`https://api.quotable.io/random?minLength=10&maxLength=125`)).json()
		const txt = response.content ?? 'Human music'
		
		editBotStatus(v, {
			status: 'online', 
			activities: [{
				createdAt: (new Date()).getTime(),
				type: ActivityTypes.Listening,
				name: `"${txt}"`
			}]
		})
	}
	
}