export const strings: Record<string, Record<string, string>> = 
{
	commandDescriptions: {
		clear: 'Deletes the last [given number] messages in the current channel. If no number given, deletes the 5 last messages.',
		addtrigger: 'Adds a trigger, a regex pattern to which the bot will react with the given response. Note that triggers are guild-wide.',
		removetrigger: 'Removes an existing trigger for the current guild.',
		triggerlist: 'Prints a list of all the triggers currently in place in this guild.',
		eightball: 'A magical 8ball that answers any of your questions ! If you get tired of the magic ball giving vague answers, add ?? at the end of your question to force it to be more decisive.',
		cointoss: 'Litterally a coin toss. What\'s more to say about this ?',
		up: 'Shows some informations about the bot, like version, up time and a link to the project\'s repository on Gitlab.',
		randint: 'Gives a random number between 1 to 6, or between the two given numbers.',
		random: 'Selects at random between the options given.',
		cipher: 'Ciphers your message into enchantment table characters.',
		decipher: 'Unciphers your message from enchantment table characters to normal letters.',
		horoscope: 'Gives your horoscope for the given sign. You can also give a number between 1 and 4 to get your horoscope for the following days.',
		emotes: 'Creates and send a zip containing all the images from the emotes contained in your message, in full size PNG/GIF.'
	}
}

export const eightBallResponses: Record<string, string[]> = {
	yes: [
		'D\'après moi oui',
		'C\'est certain',
		'Oui absolument',
		'Tu peux compter là dessus',
		'Sans aucun doute',
		'Très probable',
		'Oui.',
		'Il me semble bien',
		'J\'y crois dur comme fer',
		'C\'est sûr à 99%',
		'190km/h vers le oui',
		'Oui c\'est évident',
		'Oui j\'allais en parler',
		'Oh... C\'est oui',
		'Je ne vois pas comment ça ne pourrait pas être le cas',
	],
	likely: [
		'Ça me semble plausible',
		'Y\'a un monde où c\'est possible',
		'Oui, si tu y crois très fort',
	],
	maybe: [
		'Je préfère vraiment ne rien dire. Si je parle je vais avoir de gros problèmes. Et je ne veux pas avoir de gros problèmes',
		'Il y a 50% de chances',
		'Si je te dis la vérité tu voudras foncer dans un platane...',
	],
	unlikely: [
		'Pas impossible mais t\'aurais plus de chance de gagner au loto',
		'J\'y crois pas trop',
		'Je parierais pas là-dessus',
	],
	no: [
		'Pas la peine d\'y penser',
		'C\'est une blague ?',
		'Quand les poules auront des dents',
		'C\'est inenvisageable',
		'Non, pas moyen',
		'Oui... Euh en fait non, vraiment pas',
		'Va te faire foutre',
		'C\'est non.',
		'Peu probable',
		'Impossible',
		'N\'y compte pas',
		'Ça peut sembler étrange mais la réponse est non',
		'Hahaha... **non** c\'est mort.',
	]
}