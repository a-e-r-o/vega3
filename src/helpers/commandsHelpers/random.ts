/** 
 * USED IN 'RANDOM' COMMANDS
 * Parse the index and content of a description if found
 */
export function parseDesc(args: string[]): string {
	// If first char of an arg is a dash, consider the first beginning of the description
	let desc = ''
	const descIndex: number = args.findIndex(x => x.match(/^--/))

	// If there is a desc, it is the one beginning with a dash and all the ones after it
	if (descIndex >= 0) {
		// remove the separator from the arg to have a clean desc
		if (args[descIndex] === '--') {
			// if it's only the separator by itself remove the arg altogether
			args.splice(descIndex, 1)
		} else {
			// else, remove the separator from the arg
			args[descIndex] = args[descIndex].replace(/^--/, '')
		}

		// join all args following the one with the separator
		desc = 
			args
				.splice(descIndex, args.length - descIndex)
				.join(' ')
	}
	return desc
}

export function randInt(max: number, min = 0): number {
	return Math.floor(Math.random() * (max - min + 1) + min)
}
