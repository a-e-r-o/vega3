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
export function parseUserIds(args: string[]): string[] {
	const ids = new Set<string>()

	for (const arg of args) {
		// If discord id, convert to bigint and add
		if (isDiscordId(arg))
			ids.add(arg)
		// If mention, extract id, convert to bigint and add
		else if (isDiscordMention(arg))
			ids.add(mentionToId(arg))
	}

	return Array.from(ids)
}