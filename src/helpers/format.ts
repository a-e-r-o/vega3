import { Embed } from "../mod.ts";

export function error(input: string){
	const embed: Embed = {
		color: 15087872,
		description: `\`\`\`diff\n-${input}\`\`\``
	}
	return {embeds: [embed]}
}
export function warning(input: string){
	const embed: Embed = {
		title: 'Command failed',
		color: 14971947,
		description: input
	}
	return {embeds: [embed]}
}