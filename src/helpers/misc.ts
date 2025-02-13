

/**
 * Does what the name of the function says it does
 */
export function recordToArray(record: Record<string, unknown>): unknown[] {
	const arr = []
	for (const entry in record) {
		if (Object.prototype.hasOwnProperty.call(record, entry)) {
			arr.push(record[entry])
		}
	}
	return arr
}

/**
 * Random
 */
export function randomId(length = 5): string {
	let res = ''
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
	for (let i = 0; i < length; i++ ) {
		res += chars.charAt(Math.floor(Math.random() * chars.length))
	}
	return res
}