import { consts } from "../mod.ts";

export class Cache<T> {
	public cache: Record<string, { value: T, timeoutId: number }> 

	constructor(values: Record<string, T> = {}) {
		this.cache = 
			values ? 
				Object.fromEntries(
					Object.entries(values).map(([key, value]) => [key, { value, timeoutId: 0 }])
				) : {};
	}

	/**
	 * Gets a value from the cache by key. If the key is not in the cache, it returns undefined.
	 * @param key 
	 * @returns 
	 */
	public get (key: string): T | undefined {
		// If the key is in the cache, return it and reset the timeout
		if (this.cache[key]) {
			// Clear the old timeout
			clearTimeout(this.cache[key].timeoutId)
			// Set a new timeout to delete the key after the default TTL
			this.cache[key].timeoutId = setTimeout(() => {
				delete(this.cache[key])
			}, consts.defaultCacheTtl)
			// Return the value
			return this.cache[key].value
		}
		else {
			return undefined
		}
	}

	/**
	 * Sets a value in the cache with a key and a timeout. If the key already exists, it clears the old timeout and sets a new one.
	 * @param key 
	 * @param value 
	 */
	public set (key: string, value: T): boolean {
		let existed = false

		// If the key is already in the cache, clear the old timeout
		if (this.cache[key]) {
			clearTimeout(this.cache[key].timeoutId)
			existed = true
		}
		// Set a new timeout to delete the key after the default TTL
		const timeoutId = setTimeout(() => {
			delete(this.cache[key])
		}, consts.defaultCacheTtl)
		this.cache[key] = { value, timeoutId }

		return existed
	}


}