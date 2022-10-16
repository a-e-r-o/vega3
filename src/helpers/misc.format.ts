import { Embed } from "../mod.ts";

/** Takes a sting, returns it in an an embed formatted as a basic embed response */
 export function formatBasic(input: string){
	return { description: input }
}

/** Takes a sting, returns it in an an embed formatted as a success */
export function formatSuccess(input: string): Embed{
	return { color: 3380353, description: input }
}

/** Takes a sting, returns it in an an embed formatted as an error */
export function formatErr(input: string): Embed {
	return { color: 15087872, description: `\`\`\`diff\n-${input}\`\`\`` }
}

/** Takes a sting, returns it in an an embed formatted as a warning */
export function formatWarn(input: string){
	return { title: 'Command failed', color: 14971947, description: input }
}

/** Adds thousands separators in a string */
export function toEasyReadNumber(input: number): string{
	return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

/** Parses a number from  */
export function fromWrittenNumber(input: string): number{
	return parseFloat(rmEmoteMentions(input).replace('K','000'))
}

/** Removes all accents and diacritics in a string */
export function strNormalize(str: string) {
	return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

/** Removes all user mentions and emots in a discord msg content */
export function rmEmoteMentions(input: string): string {
	return input.replaceAll(/<(?::\w+:|@!*&*|#)[0-9]+>/gi, '')
}