export type Citizen = {
	citizenId: string
	score: number
}

export type TriggerPattern = {
	regex: string
	regexArgs: string
	type: TriggerPatternType
	description?: string
	scroreDifferential?: number
	mediaUrl?: string
	title?: string
	thumbnail?: string
	color?: number
}
export enum TriggerPatternType {
	'thoughtCrime',
	'goodCitizenSpeech',
	'meme'
}
export const triggerPatterns: TriggerPattern[] = [
	{
		description: 'On the 4th of June 1989 at Tiananmen square, __**nothing happened**__',
		regex: 'tian(\')?anmen|1989|4(th)?.*june',
		regexArgs: 'gi',
		scroreDifferential: 30,
		type: TriggerPatternType.thoughtCrime,
	},
	{
		regex: 'bin(g)?.chil(l)?in(g)?|bing qi lin|冰淇淋',
		regexArgs: 'gi',
		scroreDifferential: 15,
		type: TriggerPatternType.goodCitizenSpeech,
		description: '#速度与激情9#\n早上好中国\n现在我有冰激淋 我很喜欢冰激淋\n但是《速度与激情9》比冰激淋……\n🍦',
		mediaUrl: 'https://i.imgur.com/IksS5Xl.png'
	},
	{
		regex: 'hello.*there',
		regexArgs: 'gi',
		type: TriggerPatternType.meme,
		title: 'General Kenobi! You are a bold one.',
		mediaUrl: 'https://i.imgur.com/ItlCfD7.png'
	}
]