import { horoscopeSection, horoscopeData } from '../types/horoscope.ts'

export function parseHoroscope(rawHtml: string): horoscopeData | undefined {
	const categories: horoscopeSection[] = []

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

	for (const section of sections) {
		// get number of stars (out of 5)
		const ratingMatch = section.match(/data-rank="*."/gmi)
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
		const objSection: horoscopeSection = {
			rating: rating,
			title: split[0],
			text: split[1].replace(/<[^>]*>/g, '')
		}

		categories.push(objSection)
	}

	return { title: title, day: day, sections: categories };
}