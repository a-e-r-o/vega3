// helpers
import { strLowNoAccents } from '../helpers/miscellaneous.ts'
import { parseHoroscope } from '../helpers/parse.ts'
// Types
import { sendMessage, Embed } from '../../deps.ts'
import { CmdContext, ExError } from '../class/common.ts'
import { signs, sign } from '../types/horoscope.ts'
// cache
import { botCache } from '../../main.ts'

botCache.commands.set('horoscope', {
	aliases: ['horoscope', 'horo', 'bullshit'],
	clearance: 0,
	main: async (cmdCtx: CmdContext) => {
		let selectedSign: sign | undefined
		
		for (const arg of cmdCtx.args) {
			const sign = signs.find(x => strLowNoAccents(x.fr) == strLowNoAccents(arg))
			if (sign) {
				selectedSign = sign
				break
			}
		}

		if (!selectedSign)
			throw new ExError('Unknown or missing zodiac sign')
		
		// init embed
		const embed: Embed = {}
		embed.fields = []
		embed.title = `:${selectedSign.eng}: Horoscope du jour : ${selectedSign.fr}`
		embed.color = parseInt(selectedSign.color, 16)

		// fetch data based on sign
		const res = await fetch(`https://www.evozen.fr/horoscope/horoscope-du-jour/${strLowNoAccents(selectedSign.fr)}`)
		const data = parseHoroscope(await res.text())

		if (!data)
			throw new Error("could not retrieve horoscope for sign : " + selectedSign.fr);
		
		for (const section of data.sections) {
			embed.fields.push({
				name: `- ${section.title}  (${'★'.repeat(section.rating)+'☆'.repeat(5-section.rating)})`,
				value: section.text
			})
		}

		// add footer with date
		embed.footer = { text: data.day }

		sendMessage(cmdCtx.msg.channelID, {embed: embed})
	}
})