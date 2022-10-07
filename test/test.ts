function makeid(length: number) {
	let result = ''
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ,;:^$ù*)àçé"(-è<>!§µ£¨%²'
	const charactersLength = characters.length
	for (let i = 0; i < length; i++ ) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		)
 	}
 return result
}

// === Constants

const SAMPLE_SIZE = 50
const SAMPLE_RANGE = 1500000
const TEST_SAMPLE: string[] = []
let prefix = 'vega'
prefix = prefix.toLowerCase().normalize()

// === Sample gen

const begin_sample_init = new Date()
for (let i = 0; i < SAMPLE_RANGE; i ++) {
	TEST_SAMPLE.push(makeid(SAMPLE_SIZE))
}
const end_sample_init = new Date()
console.log(`Generated ${SAMPLE_RANGE} strings, ${SAMPLE_SIZE} characters long in ${end_sample_init.getTime() - begin_sample_init.getTime()}ms`)

// === REGEX test

const regexMatches: string[] = []
const begin_regex_match = new Date()
const regex = RegExp('^'+prefix, 'i')
for (let i = 0; i < SAMPLE_RANGE; i ++) {
	if (TEST_SAMPLE[i].match(regex))
	regexMatches.push(TEST_SAMPLE[i])
}
const end_regex_match = new Date()
console.log(`REGEX tested in ${end_regex_match.getTime() -  begin_regex_match.getTime()}ms, found ${regexMatches.length} match(es)`)
//console.log(regexMatches)

// === FOR test

const forMatches: string[] = []
const begin_for_match = new Date()
for (let i = 0; i < SAMPLE_RANGE; i ++) {
	for(let j = 0; j < prefix.length; j++){
		if (TEST_SAMPLE[i][j].toLowerCase().normalize() != prefix[j])
			break
		if (j == prefix.length-1)
			forMatches.push(TEST_SAMPLE[i])
	}
}

const end_for_match = new Date()
console.log(`FOR tested in ${end_for_match.getTime() -  begin_for_match.getTime()}ms, found ${forMatches.length} match(es)`)
//console.log(forMatches)