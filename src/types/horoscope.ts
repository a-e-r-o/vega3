export interface horoscopeData {
	day: string
	title: string
	sections: horoscopeSection[]
}
export interface horoscopeSection {
	rating: number
	title: string
	text: string 
}
export interface sign {
	eng: string
	fr: string
	color: string
}
export const signs: sign[] = [
	{ eng: 'aries', fr: 'Bélier', color: 'ff1e2b' },
	{ eng: 'taurus', fr: 'Taureau', color: '8dff65' },
	{ eng: 'gemini', fr: 'Gémeaux', color: 'afafaf' },
	{ eng: 'cancer', fr: 'Cancer', color: 'f8f8f8' },
	{ eng: 'leo', fr: 'Lion', color: 'f9d51f' },
	{ eng: 'virgo', fr: 'Vierge', color: '338cff' },
	{ eng: 'libra', fr: 'Balance', color: 'add6ff' },
	{ eng: 'scorpius', fr: 'Scorpion', color: '111111' },
	{ eng: 'sagittarius', fr: 'Sagittaire', color: '9660af' },
	{ eng: 'capricorn', fr: 'Capricorne', color: 'a8755e' },
	{ eng: 'aquarius', fr: 'Verseau', color: '050b5b' },
	{ eng: 'pisces', fr: 'Poissons', color: '37c2e2' }
]
export enum routes {
	'horoscope-du-jour',
	'horoscope-de-demain',
	'horoscope-apres-demain',
	'horoscope-dans-3-jours',
	'horoscope-dans-4-jours'
}