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
		regex: 'tian(\')?anmen|june(.)?1989|4(th)?.*june',
		regexArgs: 'gi',
		scroreDifferential: 30,
		type: TriggerPatternType.thoughtCrime,
	},
	{
		regex: 'bin(g)?.chil(l)?in(g)?|bing qi lin|冰淇淋',
		regexArgs: 'gi',
		scroreDifferential: 10,
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
	},
	{
		regex: 'hong(.)?kong',
		regexArgs: 'gi',
		type: TriggerPatternType.thoughtCrime,
		scroreDifferential: 10,
		description: '__Nothing is happening in Hong Kong__. This __**city**__ is part of the People\'s Republic of China and holds no more significance.'
	},
	{
		regex: 'taiwan(.)?is(.)?a(.)?country',
		regexArgs: 'gi',
		type: TriggerPatternType.thoughtCrime,
		description: 'TAIWAN **IS NOT** A COUNTRY. I am very disapointed, I believed in you citizen.',
		mediaUrl: 'https://i.imgur.com/KbH17B1.png',
		scroreDifferential: 20
	},
	{
		regex: 'taiwan(.)?is(.)?not(.)?a(.)?country',
		regexArgs: 'gi',
		type: TriggerPatternType.goodCitizenSpeech,
		description: 'INDEED, TAIWAN IS __NOT__ A COUNTRY. You are correct citizen, I am very proud of you!',
		mediaUrl: 'https://i.imgur.com/WDYwfR0.png',
		scroreDifferential: 20
	},
	{
		regex: 'the(.)?wok',
		regexArgs: 'gi',
		type: TriggerPatternType.meme,
		mediaUrl: 'https://c.tenor.com/yLIeWZwYM1gAAAAC/the-wok-the-rock.gif',
	},
	{
		regex: 'winnie|the(.)?pooh',
		regexArgs: 'gi',
		type: TriggerPatternType.thoughtCrime,
		description: 'PRESIDENT XI IS NOT AMUSED.\n\n __PRESIDENT XI__ Of THE PEOPLE\'S REPUBLIC OF CHINA __DOES NOT LOOK LIKE WINNIE THE POOH__',
		mediaUrl: 'https://i.imgur.com/CWC1dfr.png',
		scroreDifferential: 100
	},
	{
		regex: 'uyghur(s)?',
		regexArgs: 'gi',
		type: TriggerPatternType.thoughtCrime,
		description: 'Whatever you read or heard about that is a lie. The uyghur are not persecuted in our glorious nation of China. **The uyghur genocide does not exist but they deserve it.**',
		mediaUrl: 'https://i.imgur.com/Euj8H0E.png',
		scroreDifferential: 50
	}
]