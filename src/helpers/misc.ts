export function randInt(max: number, min = 0): number {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

export function recordToArray(record: Record<string, unknown>): unknown[] {
	const arr = []
	for (const entry in record) {
		if (Object.prototype.hasOwnProperty.call(record, entry)) {
			arr.push(record[entry]);
		}
	}
	return arr
}