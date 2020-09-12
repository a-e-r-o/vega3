import { Message } from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'

export interface Call {
	message: Message;
	function: string;
	arguments: Array<string>;
}