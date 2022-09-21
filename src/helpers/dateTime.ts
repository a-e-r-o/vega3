/**
 * Return ms until next occurence of a specified hour and minute
 */
export function msUntilTimeSlot(hours: number, minutes: number) {
	const nxtOccur = new Date()
	
	nxtOccur.setHours(hours)
	nxtOccur.setMinutes(minutes)
	nxtOccur.setSeconds(0)
	
	const nowTime = new Date().getTime()
	let nxtOccurTime = nxtOccur.getTime()

	// If next occurence would be before current time, add a full 24h
	if (nxtOccurTime < nowTime)
		nxtOccurTime += 86400000

	return nxtOccurTime - nowTime
}

/**
 * Parses a time slot written in 24 hours format with hours and minutes separated by ":" 
 * and returns an object with hours and minutes
 */
export function parseStrTimeSlot(strTimeSlot: string): number[] {
	const arrTimeSlot = strTimeSlot.split(':').length == 2 ? strTimeSlot.split(':') : strTimeSlot.split('h')

	console.log(strTimeSlot, arrTimeSlot, strTimeSlot.split(':'), strTimeSlot.split('h'))

	// Check if minutes and hours were correctly split
	if (arrTimeSlot.length < 2)
		return []

	const hours = parseInt(arrTimeSlot[0])
	const minutes = parseInt(arrTimeSlot[1])

	// check isNan
	if (isNaN(hours) || isNaN(minutes))
		return []
	// check if time slot is coherent
	if (hours > 24 || minutes > 60)
		return []

	return [hours, minutes]
}

export function readableTime(hours: number, minutes: number): string {
	return `${hours > 9 ? hours : '0'+hours}:${minutes > 9 ? minutes : '0'+minutes}`
}

export function msToReadableDuration(ms: number) {
	let msRemain = ms
	let res = ''
	// different arrays for labels and amount to allow i18n in the future
	const uNames = ['day', 'hour', 'minute', 'second']
	const uSizes = [86400000, 3600000, 60000, 1000]
	
	for (let i = 0; i < uSizes.length; i++) {
		const count = Math.floor(msRemain/uSizes[i])
		// if enough time to fill a unit, remove from the remaining time
		if (count){
			msRemain -= count*uSizes[i]
			res += count+' '+uNames[i]
		}
		// if plural
		if (count > 1)
			res += 's '
		// If no remainder
		if (msRemain % uSizes[i] == 0)
			continue
	}

	return res.trim()
}

export function msToTime(ms: number) {
	const d = Math.floor(ms/86400000)
	ms -= d*86400000
	const h = Math.floor(ms/3600000)
	ms -= h*3600000
	const m = Math.floor(ms/60000)
	ms -= m * 60000
	const s = Math.floor(ms/1000)
	
	return `${d<10?'0'+d:d}:${h<10?'0'+h:h}:${m<10?'0'+m:m}:${s<10?'0'+s:s}`
}
