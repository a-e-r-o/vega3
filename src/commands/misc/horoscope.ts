import { ctx, Command, CommandCall, signs, Sign, horoRoutes, strNormalize, getHoroscopeContent, CommandTags } from '../../mod.ts'

export const horoscope: Command = {
	tags: CommandTags.None,
	aliases: ['horoscope', 'horo', 'bullshit'],
	execute: async (call: CommandCall) => {
		let selectedSign: Sign | undefined
		
		if (!call.args[0])
			throw 'Missing argument'

		// Parse horo sign
		const parsedSign = signs.find(x => strNormalize(call.args[0]).match(strNormalize(x.fr)) || call.args[0].match(strNormalize(x.eng)))
		if (parsedSign)
			selectedSign = parsedSign
		// Warn if sign not correct
		if (!selectedSign)
			throw 'Unknown zodiac sign'

		// Set route to default
		let route = horoRoutes[0]

		// If second argument is specified
		if (call.args[1]) {
			// define route based on second argument
			const routeArg: number = parseInt(call.args[1])
			if (routeArg < 0 || routeArg > 4)
				throw `Invalid argument : "${call.args[1]}". Must be a number between 1 and 4`

			route = horoRoutes[routeArg]
		}

	 	return await getHoroscopeContent(selectedSign, route)
	}
}