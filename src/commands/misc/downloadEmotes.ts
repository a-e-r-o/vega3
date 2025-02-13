import { Command, CommandCall, formatBasic, parseEmotes, vegaLog, compress, getStreamReader, logFormatTime, consts, CommandTags } from '../../mod.ts'
import { ensureDirSync, copy } from '../../../deps.ts'
import { MessageAttachment } from 'https://deno.land/x/harmony@v2.9.1/src/structures/message.ts';

export const emotes: Command = {
	tags: CommandTags.None,
	aliases: ['emotes', 'emojis', 'emoji'],
	execute: async (call: CommandCall) => {
		const emotes = parseEmotes(call.msg.content)
		// If no emotes found
		if (emotes.length < 1)
			return 'No emote found in your message'
		// If too many emotes found
		if (emotes.length > 50)
			throw `Maximum 50 emotes at once. Your message contains ${emotes.length} unique emotes`

		// Inform user the command has been handled and the process can take a while to produce a result
		call.msg.channel.send({embeds: [formatBasic(`Downloading ${emotes.length} emotes...`)]})

		// Create temporary directory that will be used to downlaod and zip emotes
		const now = new Date()
		const tmpDir = consts.tmpDir+`/emotes_${now.getTime()}_${call.msg.author.id}`
		ensureDirSync(tmpDir)

		try {
			// files paths
			const filePaths: string[] = []
			// Iterate on emotes and try to fetch each one
			for (let i = 0; i < emotes.length; i++) {
				const emote = emotes[i]
				const rsp = await fetch(emote.url)
				const rdr = rsp?.body

				// If the request's response is readable
				if(rdr) {
					const reader = getStreamReader(rdr.getReader())
					const file = await Deno.open(`${tmpDir}/${emote.filename}`, {create: true, write: true})
					await copy(reader, file)
					file.close()
					filePaths.push(`${tmpDir}/${emote.filename}`)
				}
				else
					throw 'One of the emotes provided could not be downloaded'
			}
			// Compress files
			const zipName = `Emotes-${logFormatTime(now, '')}.zip`
			const zipPath = `${tmpDir}/${zipName}`
			const zipSucceeded = await compress(filePaths, zipPath)
			// If compression succeeded
			if (zipSucceeded){
				// Read zip file and convert to blob
				const zipBuffer = Deno.readFileSync(zipPath)
				const zipBlob = new Blob([zipBuffer])
				// SEND ZIP
				const resMsg = {
					content: `<@!${call.msg.author.id}>, here is your zip file containing ${emotes.length} emotes`,
					file: new MessageAttachment(zipName, zipBlob, 'Emotes')
				}
				call.msg.channel.send(resMsg)
			}
			// If there was an error during the compression
			else
				throw 'Emotes compression failed'
		}
		catch (err) {
			let resMsg = 'An error occured in the process'
			// If err contains a message, it's a runtime error, not a vega-throw error
			if (err instanceof Error){
				vegaLog(err.message)
				throw resMsg
			}
			else
				resMsg += ` : ${err}`
			
			throw resMsg
		}
		finally {
			// Remove folder no matter what happens
			Deno.removeSync(tmpDir, { recursive: true })
		}
	}
}