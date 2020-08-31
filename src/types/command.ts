export class Command {
	aliases!: Array<string>
	permission!: Array<number>
	main!: Function
}