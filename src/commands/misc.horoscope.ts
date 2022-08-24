import { Embed, Cmd, CmdCall, signs, Sign, routes, strNormalize, parseHoroscope, toSectionEmoji, getHoroscopeContent } from '../mod.ts'
import { ctx } from '../../main.ts'

export const horoscope: Cmd = {
	aliases: ['horoscope', 'horo', 'bullshit'],
	execute: async (cmdCtx: CmdCall) => {
		let selectedSign: Sign | undefined
		
		if (!cmdCtx.args[0])
			throw 'Missing argument'

		// Disabled for version 0.5.2
		// // Check if unsubscription
		// if (strNormalize(cmdCtx.args[0]).match(/unsub|unsubscribe/i))
		// 	return await ctx.services.horoService.unsub(cmdCtx)

		// Parse horo sign
		const parsedSign = signs.find(x => cmdCtx.args[0].match(strNormalize(x.fr)) || cmdCtx.args[0].match(strNormalize(x.eng)))
		if (parsedSign)
			selectedSign = parsedSign
		// Warn if sign not correct
		if (!selectedSign)
			throw 'Unknown zodiac sign'

		// Set route to default
		let route = routes[0]

		// If second argument is specified
		if (cmdCtx.args[1]) {
			// Disabled for version 0.5.2
			// // Check if subscription
			// if (strNormalize(cmdCtx.args[1]).match(/sub|subscribe/i))
			// 	return await ctx.services.horoService.newSub(cmdCtx, selectedSign)
			
			// define route based on second argument
			const routeArg: number = parseInt(cmdCtx.args[1])
			if (routeArg < 0 || routeArg > 4)
				throw `Invalid argument : "${cmdCtx.args[1]}". Must be a number between 1 and 4`

			route = routes[parseInt(cmdCtx.args[1])]
		}

	 	return await getHoroscopeContent(selectedSign, route)
	}
}