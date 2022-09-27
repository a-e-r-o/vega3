export type eightBallRes = {
	yes: string[]
	likely: string[]
	maybe: string[]
	unlikely: string[]
	no: string[]
}

export const res8bFr: eightBallRes = {
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
		'C\'est invenvisageable',
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