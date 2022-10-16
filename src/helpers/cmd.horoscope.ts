import { HoroscopeSection, HoroscopeData, Embed, Sign, strNormalize } from '../mod.ts'

export function parseHoroscope(rawHtml: string): HoroscopeData | undefined {
	const categories: HoroscopeSection[] = []

	// get info sections and split them
	const infoMatches = rawHtml.match(/<p class="big-1 big-sm-3 mb-1">.*<\/p><\/div><hr class="my-4 opacity-8">/gmis)
	if (!infoMatches) return
	const sections = infoMatches[0].split(/<p class="big-1 big-sm-3 mb-1">/gmi).filter(x => x != '')

	// get date of the day and clean it
	const dateMatch = rawHtml.match(/<\/h1><p class="mb-0 big-1">.*<\/p><\/div><\/div><div class="col-md-6 col-12">/i)
	if (!dateMatch) return
	const day = dateMatch[0].replace(/<..>.*>|<\/.*1">/gi, '')

	// get date of the day and clean it
	const titleMatch = rawHtml.match(/"name": "Horoscope.*",/i)
	if (!titleMatch) return
	const title = titleMatch[0].replace(/"name": "|",/gi, '')

	for (const  section of sections) {
		// get number of stars (out of 5)
		const ratingMatch = section.match(/data-rank=".*?"/gmi)
		if (!ratingMatch) continue

		let rating = parseInt(ratingMatch[0].replace('data-rank="', ''))
		rating = Math.ceil(rating/2)

		// split title and main text
		const split = section.split(/<\/p>/)
		// abord if a section's text/tile isn't formed correctly
		if (split.length !== 3 || split.includes('')) continue
		// get text cleaned up of HTML tags
		split[1] = split[1].replace(/<[^>]*>/gmi, '').replace(/&#039;/gmi, "'").replace(/&quot;/gmi, '"')

		// build object with data
		const objSection: HoroscopeSection = {
			rating: rating,
			title: split[0],
			text: split[1].replace(/<[^>]*>/g, '')
		}

		categories.push(objSection)
	}

	return { title: title, day: day, sections: categories }
}

export function toSectionEmoji(sectionName: string): string {
	if (sectionName.match('amoureuse'))
		return '💕'

	if (sectionName.match('professionnelle'))
		return '📈'

	if (sectionName.match('finances'))
		return '💸'

	if (sectionName.match('bien-être'))
		return '🌼'

	return ''
}

export async function getHoroscopeContent(selectedSign: Sign, horoRoutes: string): Promise<Embed> {
	// init embed
	const embed: Embed = {}
	embed.fields = []
	embed.color = parseInt(selectedSign.color, 16)

	// fetch data based on sign
	const res = await fetch(`https://www.evozen.fr/horoscope/${horoRoutes}/${strNormalize(selectedSign.fr)}`)
	const data = parseHoroscope(await res.text())

	if (!data)
		throw "Could not retrieve horoscope for sign : " + selectedSign.fr

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