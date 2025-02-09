import { GuildBan, GuildManager, MessagesManager } from '../../deps.ts';
import { BOT } from '../../main.ts';
import { Emote } from '../mod.ts'

import { ChannelsManager, Guild, GuildChannelsManager } from 'https://deno.land/x/harmony@v2.9.1/mod.ts'


async function deltaTest(){
	let channelManager = new ChannelsManager(BOT)
	let channel = await channelManager.get('1234')

	if (channel?.isText()){
		channel.send('Hello World!')
		let a = await channel.fetchMessages({limit: 20})
		a.forEach(async msg => {
			await msg.delete()
		})
	}

	const guildId = 'azeraezr'
	const guildManager = new GuildManager(BOT);
	const guild = await guildManager.get(guildId)


	if (guild){
		let a = new GuildChannelsManager(BOT, channelManager, guild);
		let b = await a.get('1234')
	}
}

// === msg utility functions ===

export async function deleteMsgs(msgIds: bigint[], channelID: bigint): Promise<void> {
	let channelManager = new ChannelsManager(BOT)
	let channel = await channelManager.get('1234')

	if (channel?.isText()){
		channel.send('Hello World!')
		let a = await channel.fetchMessages({limit: 20})
		a.forEach(async msg => {
			await msg.delete()
		})
	}
	return
	/*
	// if there is multiple messages, delete them all
	if (msgIds.length > 1) {
		await deleteMessages(bot, channelID, msgIds)
	// if there is a single message, delete it
	} else if (msgIds.length == 1) {
		await deleteMessage(bot, channelID, msgIds[0])
	}*/
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

/**
 * Checks if strinf provided is a discord id
 */
 export function isDiscordId (str: string): boolean {
	return /^[0-9]{18}$/.test(str)
}

/**
 * Checks if string provided is a discord member mention
 */
export function isDiscordMention(str: string): boolean {
	return /<(?:@)?(?:!)?[0-9]{18}>/.test(str)
}

/**
 * Extracts user id from a discord member mention
 */
export function mentionToId(mentionStr: string): string {
	const matches = mentionStr.match(/[0-9]{18}/)
	if (!matches)
		throw 'An error occured while parsing id from mention'
	return matches[0]
}

/**
 * Extract user ids from a list of strings
 */
export function parseUserIds(args: string[]): bigint[] {
	const ids = new Set<bigint>()

	for (const arg of args) {
		// If discord id, convert to bigint and add
		if (isDiscordId(arg))
			ids.add(BigInt(arg))
		// If mention, extract id, convert to bigint and add
		else if (isDiscordMention(arg))
			ids.add(BigInt(mentionToId(arg)))
	}

	return Array.from(ids)
}