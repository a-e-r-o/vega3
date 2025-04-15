export function ready(){
	// Clear terminal
	Deno.stdout.writeSync(new TextEncoder().encode('\x1b[H\x1b[J'))

	console.log('/// [ Service Online ] ///')
}