import { Embed } from "../mod.ts"

/** 
 * Standard method to log an error in the command line 
 */
export function vegaLog(...args: string[]){
	console.log(`~ Error caught, ${new Date().toString()}\n${args.join('\n')}`)
}


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