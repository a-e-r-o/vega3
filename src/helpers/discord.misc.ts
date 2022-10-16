import { deleteMessages, deleteMessage, Emote, BotWithCache } from '../mod.ts'

// === msg utility functions ===

export async function deleteMsgs(bot: BotWithCache, msgIds: bigint[], channelID: bigint): Promise<void> {
	// if there is multiple messages, delete them all
	if (msgIds.length > 1) {
		await deleteMessages(bot, channelID, msgIds)
	// if there is a single message, delete it
	} else if (msgIds.length == 1) {
		await deleteMessage(bot, channelID, msgIds[0])
	}
}

export function parseEmotes(msg: string): Emote[] {
	const matches = msg.match(/<(a)?:(.*?):(.*?)>/g) || []
	const emotes: Emote[] = []
	
	matches?.forEach(x => {
		x = x.replace(/[<,>]/g, '')
		const parts = x.split(':').filter(x => x != '')

		const anim = parts.length > 2
		const id = parts.pop()
		const name = parts.pop()
		const filename = `${name}.${anim?'gif':'png'}`
		const url = `https://cdn.discordapp.com/emojis/${id}.${anim?'gif':'png'}?size=512&quality=lossless`

		// If parsed data is malfrmed, abort
		if (!id || !name || !url)
			return
		// If emote is a duplicate, abort
		if (emotes.find(y => y.id == id))
			return

		emotes.push({
			animated: anim,
			id: id,
			name: name,
			url: url,
			filename: filename
		})
	})
	
	return emotes
}