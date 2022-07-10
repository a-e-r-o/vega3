import { sendMessage, Embed, Ctx, Cmd, CmdCall, signs, Sign, routes, strNormalize, parseHoroscope, toSectionEmoji } from '../mod.ts'

export const horoscope: Cmd = {
	aliases: ['horoscope', 'horo', 'bullshit'],
	execute: async (ctx: Ctx, cmdCtx: CmdCall) => {
		let selectedSign: Sign | undefined
		
		if (!cmdCtx.args[0])
			throw 'Missing zodiac sign'

		const parsedSign = signs.find(x => cmdCtx.args[0].match(strNormalize(x.fr)) || cmdCtx.args[0].match(strNormalize(x.eng)))
		if (parsedSign)
			selectedSign = parsedSign

		if (!selectedSign)
			throw 'Unknown zodiac sign'

		const arg1: number = parseInt(cmdCtx.args[1]) || 0
		if (arg1 < 0 || arg1 > 4)
			throw `Invalid argument : "${cmdCtx.args[1]}". Must be a number between 1 and 4`

		const route = routes[parseInt(cmdCtx.args[1])] || routes[0]
		
		// init embed
		const embed: Embed = {}
		embed.fields = []
		embed.color = parseInt(selectedSign.color, 16)
		
		
		// fetch data based on sign
		const res = await fetch(`https://www.evozen.fr/horoscope/${route}/${strNormalize(selectedSign.fr)}`)
		const data = parseHoroscope(await res.text())

		if (!data)
			throw new Error("Could not retrieve horoscope for sign : " + selectedSign.fr)
		
		for (const section of data.sections) {
			embed.fields.push({
				name: `${toSectionEmoji(section.title)}   ${'▰'.repeat(section.rating)+'▱'.repeat(5-section.rating)}   ${section.title}`,
				value: section.text
			})
		}
		// ajout du disclaimer à la fin 
		embed.fields[embed.fields.length-1].value += '\n\n*Si vous trouvez que votre horoscope correspond particulièrement bien à la réalité, cliquez [ici](https://fr.wikipedia.org/wiki/Effet_Barnum)*'
		embed.title = `:${selectedSign.eng}:  ${selectedSign.fr} : Horoscope du ${data.day.toLowerCase()}`
		embed.thumbnail = { url: selectedSign.img }

		return embed
	}
}