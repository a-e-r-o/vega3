export type HoroscopeData = {
	day: string
	title: string
	sections: HoroscopeSection[]
}
export type HoroscopeSection = {
	rating: number
	title: string
	text: string 
}
export type Sign = {
	eng: string
	fr: string
	color: string
	img: string
}
export const signs: Sign[] = [
	{ eng: 'aries', fr: 'Bélier', color: 'ff1e2b', img: 'https://pngimg.com/uploads/aries/aries_PNG46.png' },
	{ eng: 'taurus', fr: 'Taureau', color: '8dff65', img: 'https://pngimg.com/uploads/taurus/taurus_PNG31.png' },
	{ eng: 'gemini', fr: 'Gémeaux', color: 'afafaf', img: 'https://pngimg.com/uploads/gemini/gemini_PNG46.png' },
	{ eng: 'cancer', fr: 'Cancer', color: 'f8f8f8', img: 'https://pngimg.com/uploads/cancer_zodiac/cancer_zodiac_PNG44.png' },
	{ eng: 'leo', fr: 'Lion', color: 'f9d51f', img: 'https://pngimg.com/uploads/leo/leo_PNG19.png' },
	{ eng: 'virgo', fr: 'Vierge', color: '338cff', img: 'https://pngimg.com/uploads/virgo/virgo_PNG14.png' },
	{ eng: 'libra', fr: 'Balance', color: 'add6ff', img: 'https://pngimg.com/uploads/libra/libra_PNG43.png' },
	{ eng: 'scorpius', fr: 'Scorpion', color: '111111', img: 'https://pngimg.com/uploads/scorpio/scorpio_PNG31.png' },
	{ eng: 'sagittarius', fr: 'Sagittaire', color: '9660af', img: 'https://pngimg.com/uploads/sagittarius/sagittarius_PNG74.png' },
	{ eng: 'capricorn', fr: 'Capricorne', color: 'a8755e', img: 'https://pngimg.com/uploads/capricorn/capricorn_PNG48.png' },
	{ eng: 'aquarius', fr: 'Verseau', color: '050b5b', img: 'https://pngimg.com/uploads/aquarius/aquarius_PNG20.png' },
	{ eng: 'pisces', fr: 'Poisson', color: '37c2e2', img: 'https://pngimg.com/uploads/pisces/pisces_PNG15.png' }
]
export enum routes {
	'horoscope-du-jour',
	'horoscope-de-demain',
	'horoscope-apres-demain',
	'horoscope-dans-3-jours',
	'horoscope-dans-4-jours'
}