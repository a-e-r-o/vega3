/**
 * Checks if strinf provided is a discord id
 */
export function isDiscordId (str: string): boolean {
	return /^[0-9]{18}$/.test(str)
}

/**
 * Checks if string provided is a discord member mention
 */
export function isDiscordMention(str: string): boolean {
	return /<(?:@)?(?:!)?[0-9]{18}>/.test(str)
}

/**
 * Extracts user id from a discord member mention
 */
export function mentionToId(mentionStr: string): string {
	const matches = mentionStr.match(/[0-9]{18}/)
	if (!matches)
		throw 'An error occured while parsing id from mention'
	return matches[0]
}

/**
 * Extract user ids from a list of strings
 */
export function parseUserIds(args: string[]): bigint[] {
	const ids = new Set<bigint>()

	for (const arg of args) {
		// If discord id, convert to bigint and add
		if (isDiscordId(arg))
			ids.add(BigInt(arg))
		// If mention, extract id, convert to bigint and add
		else if (isDiscordMention(arg))
			ids.add(BigInt(mentionToId(arg)))
	}

	return Array.from(ids)
}