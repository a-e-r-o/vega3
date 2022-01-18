import { rmEmoteMentions } from "../mod.ts";

export async function fetchDongRate(): Promise<string |undefined> {
	try {
		const res = await fetch(`https://www.xe.com/fr/currencyconverter/convert/?Amount=1&From=EUR&To=VND`)
		const rawData: string = await res.text()

		return rawData
	} catch(err) {
		console.log('~ Error caught', new Date())
		console.log(err.message)
	}
}

export function parseDongRate(rawData: string): number | undefined {
	try {
		const lineMatch = rawData.match(/class="result__BigRate-sc.*[0-9]<span/gmsu)
		const priceMatch = lineMatch![0].match(/>[0-9]*.[0-9]*</gmisu)
		// The second replace is not a regular whitespace
		const rawPrice = priceMatch![0].replace(/>|</gi, '').replace(' ', '')
		// We need to remove the special whitespace before parsing
		const price = parseInt(rawPrice)

		return price
	} catch(err) {
		console.log('~ Error caught', new Date())
		console.log(err.message)
	}
}

export function toEasyReadNumber(input: number): string{
	return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

export function fromWrittenNumber(input: string): number{
	return parseFloat(rmEmoteMentions(input).replace('K','000'))
}