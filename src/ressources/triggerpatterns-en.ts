import { TriggerPattern, TriggerPatternType } from "../mod.ts";

export const triggerPatterns_en: TriggerPattern[] = [
	// === MEMES ===
	{
		id: 'hello_there',
		regex: 'hello.there',
		regexArgs: 'gi',
		type: TriggerPatternType.meme,
		mediaUrl: 'https://c.tenor.com/smu7cmwm4rYAAAAC/general-kenobi-kenobi.gif'
	},
	{
		id: 'the_wok',
		regex: 'the(.)?wok',
		regexArgs: 'gi',
		type: TriggerPatternType.meme,
		mediaUrl: 'https://c.tenor.com/VmxCjy966YwAAAAM/the-wok-the-rock.gif',
	},
	// === Thoughcrimes===
	{
		id: 'tiananmen_square',
		description: 'On the 4th of June 1989 at Tiananmen square, __**nothing happened**__',
		regex: 'tian(\')?anmen|june(.)?1989|4(th)?.*june',
		regexArgs: 'gi',
		scroreDifferential: 60,
		type: TriggerPatternType.thoughtCrime,
	},
	{
		id: 'uyghurs',
		regex: 'uyghur(s)?',
		regexArgs: 'gi',
		type: TriggerPatternType.thoughtCrime,
		description: 'Whatever you read or heard about that is a lie. The uyghur are not persecuted in our glorious nation of China. **The uyghur genocide does not exist but they deserve it.**',
		mediaUrl: 'https://i.imgur.com/Euj8H0E.png',
		scroreDifferential: 70
	},
	{
		id: 'hong_kong',
		regex: 'hong(.)?kong',
		regexArgs: 'gi',
		type: TriggerPatternType.thoughtCrime,
		scroreDifferential: 30,
		description: '__Nothing is happening in Hong Kong__. This __**city**__ is part of the People\'s Republic of China and holds no more significance.'
	},
	{
		id: 'taiwan_is_a_country',
		regex: 'taiwan(.)?is(.)?a(.)?country',
		regexArgs: 'gi',
		type: TriggerPatternType.thoughtCrime,
		description: 'TAIWAN **IS NOT** A COUNTRY. I am very disapointed, I believed in you citizen.',
		mediaUrl: 'https://i.imgur.com/KbH17B1.png',
		scroreDifferential: 60
	},
	{
		id: 'winnie_the_pooh',
		regex: 'winnie|the(.)?pooh',
		regexArgs: 'gi',
		type: TriggerPatternType.thoughtCrime,
		description: 'PRESIDENT XI IS NOT AMUSED.\n\n __PRESIDENT XI__ Of THE PEOPLE\'S REPUBLIC OF CHINA __DOES NOT LOOK LIKE WINNIE THE POOH__',
		mediaUrl: 'https://i.imgur.com/CWC1dfr.png',
		scroreDifferential: 60
	},
	{
		id: 'china_bad',
		regex: 'china bad|china is bad',
		regexArgs: 'gi',
		type: TriggerPatternType.thoughtCrime,
		description: 'China is the best country in the world, **you should be proud to be part of it citizen**.',
		scroreDifferential: 20
	},
	// === Good citizen speech
	{
		id: 'bing_chilling',
		regex: 'bin(g)?.chil(l)?in(g)?|bing qi lin|冰淇淋',
		regexArgs: 'gi',
		scroreDifferential: 50,
		type: TriggerPatternType.goodCitizenSpeech,
		description: '#速度与激情9#\n早上好中国\n现在我有冰激淋 我很喜欢冰激淋\n但是《速度与激情9》比冰激淋……\n🍦',
		mediaUrl: 'https://c.tenor.com/cWsK6nwdcHYAAAAM/bing-chi-ling-alex-mei-bing.gif'
	},
	{
		id: 'ching_cheng_hanji',
		regex: 'chin(g)?(.)?chen(g)?(.)?hanji(.)?',
		regexArgs: 'gi',
		scroreDifferential: 30,
		type: TriggerPatternType.goodCitizenSpeech,
		mediaUrl: 'https://c.tenor.com/xnRrTN2HlJQAAAAC/tom-ching-cheng-hanji.gif'
	},
	
	{
		id: 'taiwan_is_not_a_country',
		regex: 'taiwan(.)?is(.)?not(.)?a(.)?country',
		regexArgs: 'gi',
		type: TriggerPatternType.goodCitizenSpeech,
		description: 'INDEED, TAIWAN IS __NOT__ A COUNTRY. You are correct citizen, I am very proud of you!',
		mediaUrl: 'https://i.imgur.com/WDYwfR0.png',
		scroreDifferential: 70
	},
	{
		id: 'china_good',
		regex: 'china good|china is good',
		regexArgs: 'gi',
		type: TriggerPatternType.goodCitizenSpeech,
		description: 'China is the best country in the world. **Long live the People\'s republic of China !**',
		scroreDifferential: 20
	},	
	{
		id: 'mao_zedong',
		regex: 'glory(.)?to(.)?mao(.)?zedong',
		regexArgs: 'gi',
		type: TriggerPatternType.goodCitizenSpeech,
		description: 'Glory and respect to the grorious leader Mao Zedong :pray:   :flag_cn:',
		mediaUrl: 'https://c.tenor.com/jHijr_0-zucAAAAC/mao-ze-dong-waving.gif',
		scroreDifferential: 80
	}
]