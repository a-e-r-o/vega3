import { strLowNoAccents } from '../helpers/miscellaneous.ts'
// Types
import { Message, sendMessage, Embed, EmbedField, EmbedAuthor, EmbedProvider, EmbedFooter } from '../../deps.ts'
import { CmdContext } from '../class/class.ts'
// cache
import { botCache } from '../../main.ts'

botCache.commands.set('horoscope', {
	aliases: ['horoscope', 'horo', 'bullshit'],
	clearance: 0,
	main: async (cmdCtx: CmdContext) => {
		const signs = [
			{fr: 'Bélier', eng: 'aries'},
			{fr: 'Taureau', eng: 'taurus'},
			{fr: 'Gémeaux', eng: 'gemini'},
			{fr: 'Cancer', eng: 'cancer'},
			{fr: 'Lion', eng: 'leo'},
			{fr: 'Virge', eng: 'virgo'},
			{fr: 'Balance', eng: 'libra'},
			{fr: 'Scorpion', eng: 'scorpius'},
			{fr: 'Sagittaire', eng: 'sagittarus'},
			{fr: 'Capricorne', eng: 'capricorn'},
			{fr: 'Verseau', eng: 'aquarius'},
			{fr: 'Poissons', eng: 'pisces'}
		]

		let selectedSign: string | undefined

		for (const arg of cmdCtx.args) {
			for (const sign of signs) {
				if (strLowNoAccents(sign.fr) == strLowNoAccents(arg)) {
					selectedSign = sign.fr
					break
				}
			}
			break
		}

		if (!selectedSign)
			return sendMessage(cmdCtx.msg.channelID, 'Unknown or missing zodiac sign')
		
		// init embed
		const embed: Embed = {}
		embed.fields = []
		embed.title = `:${signs.find(x=>x.fr == selectedSign)?.eng}: Horoscope du jour : ${selectedSign}`

		// fetch data based on sign
		const res = await fetch(`https://www.evozen.fr/horoscope/horoscope-du-jour/${strLowNoAccents(selectedSign)}`)
		const data = digestHoroscopeData(await res.text())

		if (!data)
			return sendMessage(cmdCtx.msg.channelID, 'Could not retreive your horoscope')
		
		for (const section of data.sections) {
			embed.fields.push({
				name: `- ${section.title}  (${'✭'.repeat(section.rating)+'☆'.repeat(5-section.rating)})`,
				value: section.text
			})
		}

		// add footer with date
		embed.footer = { text: data.day }

		sendMessage(cmdCtx.msg.channelID, {embed: embed})
	}
})

interface horoscopeData {
	day: string
	sections: horoscopeSection[]
}
interface horoscopeSection {
	rating: number
	title: string
	text: string 
}

function digestHoroscopeData(rawHtml: string): horoscopeData | undefined {
	const categories: horoscopeSection[] = []

	// get info sections and split them
	const infoMatches = rawHtml.match(/<p class="big-1 big-sm-3 mb-1">.*<\/p><\/div><hr class="my-4 opacity-8">/gmi) || []
	if (!infoMatches) return
	const sections = infoMatches[0].split(/<p class="big-1 big-sm-3 mb-1">/gmi)

	// get date of the day and clean it
	const dateMatch = rawHtml.match(/<\/h1><p class="mb-0 big-1">.*<\/p><\/div><\/div><div class="col-md-6 col-12">/i)
	if (!dateMatch) return
	const day = dateMatch[0].replace(/<..>.*>|<\/.*1">/gi, '')

	for (const section of sections) {
		// get number of stars (out of 5)
		const ratingMatch = section.match(/data-rank="*."/gmi)
		if (!ratingMatch) continue
		let rating = parseInt(ratingMatch[0].replace('data-rank="', ''))
		rating = Math.ceil(rating/2)

		// get text cleaned up of HTML tags
		const split = section.split(/<\/p>/)
		// split title and main text
		split[1] = split[1].replace(/<[^>]*>/gmi, '').replace(/&#039;/gmi, "'")
		// abord if a section's text/tile isn't formed correctly
		if (split.length !== 3 || split.includes('')) continue

		// build object with data
		const objSection: horoscopeSection = {
			rating: rating,
			title: split[0],
			text: split[1].replace(/<[^>]*>/g, '')
		}

		categories.push(objSection)
	}

	return { day: day, sections: categories };
}