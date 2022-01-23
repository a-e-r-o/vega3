export type Citizen = {
	citizenId: string
	score: number
}

export type TriggerLog = {
	citizenId: string
	triggerId: string
	timestamp: number
	factor: number
}

export type TriggerPattern = {
	/**
	 * snake case unique id
	 */
	id: string
	/**
	 * Regex pattern as string
	 */
	regex: string
	/**
	 * Exemple : 'gi'
	 */
	regexArgs: string
	type: TriggerPatternType
	/**
	 * Main text content
	 */
	description?: string
	/**
	 * (For thoughtCrimes and goodCitizenSpeechs). How many social credits to be deducted or added upon trigger
	 */
	scroreDifferential?: number
	/**
	 * URL for Image or GIF in the embed
	 */
	mediaUrl?: string
	/**
	 * Embed title
	 */
	title?: string
	/**
	 * URL for smaller image in the top-right corner of the embed
	 */
	thumbnail?: string
	/**
	 * Embed color
	 */
	color?: number
}
export enum TriggerPatternType {
	'thoughtCrime',
	'goodCitizenSpeech',
	'meme'
}