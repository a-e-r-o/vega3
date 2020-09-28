export interface Command {
	aliases: Array<string>;
	permission: Array<number>;
	main: Function;
}