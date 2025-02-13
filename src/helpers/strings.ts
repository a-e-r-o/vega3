/**
 * Adds thousands separators in a string
 */
export function toEasyReadNumber(input: number): string{
	return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

/**
 * Parses a number from  
 */
export function fromWrittenNumber(input: string): number{
	return parseFloat(rmEmoteMentions(input).replace('K','000'))
}

/**
 * Removes all accents and diacritics in a string 
 */
export function strNormalize(str: string) {
	return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

/** 
 * Removes all user mentions and emots in a discord msg content 
 */
export function rmEmoteMentions(input: string): string {
	return input.replaceAll(/<(?::\w+:|@!*&*|#)[0-9]+>/gi, '')
}
