// helpers
import { strLowNoAccents } from '../helpers/miscellaneous.ts'
import { parseHoroscope } from '../helpers/parse.ts'
// Types
import { sendMessage, Embed } from '../../deps.ts'
import { CmdContext, ExError } from '../class/common.ts'
import { signs, sign, routes } from '../types/horoscope.ts'
// cache
import { botCache } from '../../main.ts'

botCache.commands.set('horoscope', {
	aliases: ['horoscope', 'horo', 'bullshit'],
	clearance: 0,
	main: async (cmdCtx: CmdContext) => {
		let selectedSign: sign | undefined
		
		const sign = signs.find(x => strLowNoAccents(x.fr) == strLowNoAccents(cmdCtx.args[0]))
		if (sign)
			selectedSign = sign

		const arg1: number = parseInt(cmdCtx.args[1]) || 0
		if (arg1 < 0 || arg1 > 4)
			throw new ExError(`Invalid argumemnt : ${cmdCtx.args[1]}`)

		const route = routes[parseInt(cmdCtx.args[1])] || routes[0]

		if (!selectedSign)
			throw new ExError('Unknown or missing zodiac sign')
		
		// init embed
		const embed: Embed = {}
		embed.fields = []
		embed.color = parseInt(selectedSign.color, 16)

		// fetch data based on sign
		const res = await fetch(`https://www.evozen.fr/horoscope/${route}/${strLowNoAccents(selectedSign.fr)}`)
		const data = parseHoroscope(await res.text())

		if (!data)
			throw new Error("could not retrieve horoscope for sign : " + selectedSign.fr);
		
		for (const section of data.sections) {
			embed.fields.push({
				name: `- ${section.title}  (${'★'.repeat(section.rating)+'☆'.repeat(5-section.rating)})`,
				value: section.text
			})
		}

		embed.title = `:${selectedSign.eng}: ${data.title} : ${selectedSign.fr}`
		embed.footer = { text: data.day }

		sendMessage(cmdCtx.msg.channelID, {embed: embed})
	}
})