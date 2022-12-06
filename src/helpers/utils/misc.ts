export function randInt(max: number, min = 0): number {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Does what the name of the function says it does
 */
export function recordToArray(record: Record<string, unknown>): unknown[] {
	const arr = []
	for (const entry in record) {
		if (Object.prototype.hasOwnProperty.call(record, entry)) {
			arr.push(record[entry]);
		}
	}
	return arr
	}

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

/**
 * Random
 */
export function randomId(length = 5): string {
	let res = '';
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	for (let i = 0; i < length; i++ ) {
		res += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return res;
}