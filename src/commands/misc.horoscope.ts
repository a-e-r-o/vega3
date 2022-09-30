import { Cmd, CmdCall, signs, Sign, routes, strNormalize, getHoroscopeContent } from '../mod.ts'
import { ctx } from '../../main.ts'

export const horoscope: Cmd = {
	aliases: ['horoscope', 'horo', 'bullshit'],
	execute: async (call: CmdCall) => {
		let selectedSign: Sign | undefined
		
		if (!call.args[0])
			throw 'Missing argument'

		// Check if unsubscription
		if (strNormalize(call.args[0]).match(/unsub|unsubscribe/i))
			return await ctx.horoService.unsub(call)

		// Parse horo sign
		const parsedSign = signs.find(x => call.args[0].match(strNormalize(x.fr)) || call.args[0].match(strNormalize(x.eng)))
		if (parsedSign)
			selectedSign = parsedSign
		// Warn if sign not correct
		if (!selectedSign)
			throw 'Unknown zodiac sign'

		// Set route to default
		let route = routes[0]

		// If second argument is specified
		if (call.args[1]) {
			// Check if subscription
			if (strNormalize(call.args[1]).match(/sub|subscribe/i))
				return await ctx.horoService.newSub(call, selectedSign)
			
			// define route based on second argument
			const routeArg: number = parseInt(call.args[1])
			if (routeArg < 0 || routeArg > 4)
				throw `Invalid argument : "${call.args[1]}". Must be a number between 1 and 4`

			route = routes[routeArg]
		}

	 	return await getHoroscopeContent(selectedSign, route)
	}
}