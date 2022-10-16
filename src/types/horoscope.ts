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
	id: number
	eng: string
	fr: string
	color: string
	img: string
}
export const signs: Sign[] = [
	{ id: 0, eng: 'aquarius', fr: 'Verseau', color: '050b5b', img: 'https://pngimg.com/uploads/aquarius/aquarius_PNG20.png' },
	{ id: 1, eng: 'aries', fr: 'Bélier', color: 'ff1e2b', img: 'https://pngimg.com/uploads/aries/aries_PNG46.png' },
	{ id: 2, eng: 'cancer', fr: 'Cancer', color: 'f8f8f8', img: 'https://pngimg.com/uploads/cancer_zodiac/cancer_zodiac_PNG44.png' },
	{ id: 3, eng: 'capricorn', fr: 'Capricorne', color: 'a8755e', img: 'https://pngimg.com/uploads/capricorn/capricorn_PNG48.png' },
	{ id: 4, eng: 'gemini', fr: 'Gémeaux', color: 'afafaf', img: 'https://pngimg.com/uploads/gemini/gemini_PNG46.png' },
	{ id: 5, eng: 'leo', fr: 'Lion', color: 'f9d51f', img: 'https://pngimg.com/uploads/leo/leo_PNG19.png' },
	{ id: 6, eng: 'libra', fr: 'Balance', color: 'add6ff', img: 'https://pngimg.com/uploads/libra/libra_PNG43.png' },
	{ id: 7, eng: 'pisces', fr: 'Poissons', color: '37c2e2', img: 'https://pngimg.com/uploads/pisces/pisces_PNG15.png' },
	{ id: 8, eng: 'sagittarius', fr: 'Sagittaire', color: '9660af', img: 'https://pngimg.com/uploads/sagittarius/sagittarius_PNG74.png' },
	{ id: 9, eng: 'scorpius', fr: 'Scorpion', color: '111111', img: 'https://pngimg.com/uploads/scorpio/scorpio_PNG31.png' },
	{ id: 10, eng: 'taurus', fr: 'Taureau', color: '8dff65', img: 'https://pngimg.com/uploads/taurus/taurus_PNG31.png' },
	{ id: 11, eng: 'virgo', fr: 'Vierge', color: '338cff', img: 'https://pngimg.com/uploads/virgo/virgo_PNG14.png' }
]
export enum horoRoutes {
	'horoscope-du-jour',
	'horoscope-de-demain',
	'horoscope-apres-demain',
	'horoscope-dans-3-jours',
	'horoscope-dans-4-jours'
}

export type HoroSubscriptionDto = {
	channelId: string
	userId: string
	signId: number
	timeslot: number[]
}

export interface HoroSubscription extends HoroSubscriptionDto {
	timeOutId?: number
}