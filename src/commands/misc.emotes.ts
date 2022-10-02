import { Cmd, CmdCall, formatBasic, parseEmotes, sendMessage, readerFromStreamReader, copy, compress } from "../mod.ts"

export const emotes: Cmd = {
	aliases: ['emojis', 'emoji', 'emotes'],
	disabled: true,
	execute: async (call: CmdCall) => {
		const emotes = parseEmotes(call.msg.content)
		// If no emotes found
		if (emotes.length < 1)
			return 'No emote found in your message'
		// If too many emotes found
		if (emotes.length > 40)
			throw `Maximum 40 emotes at once. Your message contains ${emotes.length} unique emotes`

		sendMessage(call.msg.channelId, {embeds: [formatBasic('Working on it. This process might take several seconds...')]})

		// files paths
		const filePaths = []

		for (let i = 0; i < emotes.length; i++) {
			const emote = emotes[i];
			const rsp = await fetch(emote.url);
			const rdr = rsp.body?.getReader();
	
			if(rdr) {
				const reader = readerFromStreamReader(rdr);
				const file = await Deno.open(`./.temp/${emote.filename}`, {create: true, write: true});
				await copy(reader, file);
				file.close();
				filePaths.push(`./.temp/${emote.filename}`)
			}
		}

		if (await compress(filePaths, './.temp/emotes.zip', {overwrite: true})){
			const zipBuffer = await Deno.readFileSync(`./.temp/emotes.zip`);
			const zipBlob = new Blob([zipBuffer]);
			sendMessage(call.msg.channelId, {file: {name: 'emotes.zip', blob: zipBlob}})
		}
	}
}