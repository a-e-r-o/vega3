export function strNormalize(str: string) {
	return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace('é', 'e')
}

export async function exists(path: string) {
	try {
		await Deno.stat(path)
		// successful, file or directory must exist
		return true
	} catch (error) {
		if (error && (error.name === Deno.errors.NotFound.name)) {
			// file or directory does not exist
			return false
		} else {
			// unexpected error, maybe permissions, pass it along
			throw error
		}
	}
}

/**
 * Method to remove all files in a folder, because Deno deosn't provide this for whatever reason
 */
export async function clearDir(dirPath: string) {
	for await(const dirEntry of Deno.readDir(dirPath)) {
    await Deno.remove(`${dirPath}/${dirEntry.name}`, { recursive: true })
	}
	
}

export function randInt(max: number, min = 0): number {
	return Math.floor(Math.random() * (max - min + 1) + min)
}