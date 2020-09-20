import { Message } from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'

export class Call {
	public message!: Message;
	public command!: string;
	public arguments!: Array<string>;

	constructor (message: Message) {

		this.message = message;
		this.arguments = this.parseArgs(message.content);
	}

	private parseArgs(content: string): string[] {
		return [];
	}
}