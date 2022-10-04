import { Cmd, CmdCall, formatBasic, parseEmotes, sendMessage, readerFromStreamReader, copy, compress, ensureDir, formatWarn, vegaLog } from "../mod.ts"

export const emotes: Cmd = {
	aliases: ['emojis', 'emoji', 'emotes'],
	disabled: false,
	execute: async (call: CmdCall) => {
		const emotes = parseEmotes(call.msg.content)
		// If no emotes found
		if (emotes.length < 1)
			return 'No emote found in your message'
		// If too many emotes found
		if (emotes.length > 50)
			throw `Maximum 50 emotes at once. Your message contains ${emotes.length} unique emotes`

		// Inform user the command has been handled and the process can take a while to produce a result
		sendMessage(call.msg.channelId, {embeds: [formatBasic('Working on it. This process might take several seconds...')]})

		// Create temporary directory that will be used to downlaod and zip emotes
		const tmpDir = `./.temp/emotes_${call.msg.authorId}_${new Date().getMilliseconds()}`
		ensureDir(tmpDir)

		try {
			// files paths
			const filePaths = []
			// Iterate on emotes and try to fetch each one
			for (let i = 0; i < emotes.length; i++) {
				const emote = emotes[i];
				const rsp = await fetch(emote.url);
				const rdr = rsp.body?.getReader();

				// If the request's response is readable
				if(rdr) {
					const reader = readerFromStreamReader(rdr);
					const file = await Deno.open(`${tmpDir}/${emote.filename}`, {create: true, write: true});
					await copy(reader, file);
					file.close();
					filePaths.push(`${tmpDir}/${emote.filename}`)
				} 
				else
					throw 'One of the emotes provided could not be downloaded'
			}

			// Compress files
			const zipFilePath = `${tmpDir}/emotes.zip`
			const zipSucceeded = await compress(filePaths, zipFilePath, {overwrite: true})
			// If compression succeeded
			if (zipSucceeded){
				const zipBuffer = Deno.readFileSync(zipFilePath);
				const zipBlob = new Blob([zipBuffer]);
				sendMessage(call.msg.channelId, {file: {name: 'emotes.zip', blob: zipBlob}})
			}
			// If there was an error during the compression
			else
				throw 'Emotes compression failed'
		}
		// Catch error and log it
		catch (err) {
			let resMsg = 'An error occured in the process'
			// If err contains a message, it's a runtime error, not a vega-throw error
			if (err.message){
				resMsg += '. Please retry later. If the error percists, contact this bot\'s administrator'
				vegaLog(err.message)
			}
			else {
				resMsg += ` : ${err}`
			}
			// Warn user of the situation
			sendMessage(call.msg.channelId, {embeds: [
				formatWarn(resMsg)
			]})
		}
		// Remove folder no matter what happens
		finally {
			Deno.removeSync(tmpDir, { recursive: true });
		}
	}
}