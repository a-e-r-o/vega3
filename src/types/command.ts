export interface Command {
	aliases: Array<string>
	clearance: number
	main: Function
}