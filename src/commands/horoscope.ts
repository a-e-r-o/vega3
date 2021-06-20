import { sendMessage, Embed } from '../../deps.ts'
import { CmdContext, Command } from '../types/common.ts'
import { strLowNoAccents } from '../helpers/miscellaneous.ts'
import { parseHoroscope } from '../helpers/horoscope.ts'
import { signs, sign, routes } from '../types/horoscope.ts'

export const cmd: Command = {
	aliases: ['horoscope', 'horo', 'bullshit'],
	clearance: 0,
	main: async (cmdCtx: CmdContext) => {
		let selectedSign: sign | undefined

		if (!cmdCtx.args[0])
			throw 'Missing zodiac sign'
		
		const pattern = new RegExp(strLowNoAccents(cmdCtx.args[0]), 'im')

		const parsedSign = signs.find(x => strLowNoAccents(x.fr).match(pattern) || strLowNoAccents(x.eng).match(pattern))
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
		// const res = await fetch(`https://www.evozen.fr/horoscope/${route}/${strLowNoAccents(selectedSign.fr)}`)
		// Temporary fix with a intermediate local server because deno is stupid and doesn't have an option to ignore invalid SSL certificates
		const res = await fetch(`http://localhost:8000/horoscope/${route}/${strLowNoAccents(selectedSign.fr)}`)
		const data = parseHoroscope(await res.text())

		if (!data)
			throw new Error("Could not retrieve horoscope for sign : " + selectedSign.fr);
		
		for (const section of data.sections) {
			embed.fields.push({
				name: `- ${section.title}  (${'★'.repeat(section.rating)+'☆'.repeat(5-section.rating)})`,
				value: section.text
			})
		}
		// ajout du disclaimer à la fin 
		embed.fields[embed.fields.length-1].value += '\n\n*Si vous trouvez que votre horoscope correspond particulièrement bien à la réalité, cliquez [ici](https://fr.wikipedia.org/wiki/Effet_Barnum)*'
		embed.title = `:${selectedSign.eng}:  ${selectedSign.fr} : Horoscope du ${data.day.toLowerCase()}`

		sendMessage(cmdCtx.channel, {embed: embed})
	}
}