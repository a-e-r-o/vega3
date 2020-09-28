import { Message } from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'

export class Call {
	public msg!: Message;
	public cmd!: string;
	public args!: Array<string>;

	constructor (message: Message, prefix: string) {
		this.msg = message;
		let args = this.parseArgs(message.content, prefix);
		this.cmd = args.shift() || '';
		this.args = args;
	}

	private parseArgs(content: string, prefix: string): string[] {
		let args: Array<string> = 
			content
				.replace(RegExp(`^${prefix}`,'i'),'')
				.trim()
				.split(' ')
				.filter(x => x !== ' ');

		return args;
	}
}