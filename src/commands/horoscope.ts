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
		
		const parsedSign = signs.find(x => strLowNoAccents(x.fr) == strLowNoAccents(cmdCtx.args[0] ?? ''))
		if (parsedSign)
			selectedSign = parsedSign

		if (!selectedSign)
			throw 'Unknown or missing zodiac sign'

		const arg1: number = parseInt(cmdCtx.args[1]) || 0
		if (arg1 < 0 || arg1 > 4)
			throw `Invalid argument : "${cmdCtx.args[1]}". Must be a number between 1 and 4`

		const route = routes[parseInt(cmdCtx.args[1])] || routes[0]
		
		// init embed
		const embed: Embed = {}
		embed.fields = []
		embed.color = parseInt(selectedSign.color, 16)

		// temporary sytem, due to Deno being unable to handle fetch with SSL errors and Evozen having an invalid certificate
		await sendMessage(cmdCtx.msg.channelID, `__**https://www.evozen.fr/horoscope/${route}/${strLowNoAccents(selectedSign.fr)}**__\n*Ceci est un comportement temporaire de la commande, dû à des difficultés techniques*`)

		/*
		// fetch data based on sign
		const res = await fetch(`https://www.evozen.fr/horoscope/${route}/${strLowNoAccents(selectedSign.fr)}`)
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

		sendMessage(cmdCtx.msg.channelID, {embed: embed})
		*/
	}
}