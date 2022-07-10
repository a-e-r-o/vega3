import { strNormalize, DiscordenoMember, cache, fetchMembers, DiscordenoMessage, getMember, deleteMessages, deleteMessage } from '../mod.ts'

// === msg utility functions ===

export async function deleteMsgs(messages: DiscordenoMessage[], channelID: bigint): Promise<void> {
	// if there is multiple messages, delete them all
	if (messages.length > 1) {
		await deleteMessages(channelID, messages.map((m) => m.id))
	// if there is a single message, delete it
	} else if (messages.length == 1) {
		await deleteMessage(channelID, messages[0].id)
	}
}

// === args parsing functions ===

export function isDiscordId (testValue: string): boolean {
	return /^[0-9]{18}$/.test(testValue)
}

export function isDiscordMention(testValue: string): boolean {
	return /<(?:@)?(?:!)?[0-9]{18}>/.test(testValue)
}

export function isDiscordTag (testValue: string): boolean {
	return /.+#[0-9]{4}$/.test(testValue)
}

export function splitDiscordTag (tag: string): {name: string, discriminator: number} {
	const matches = tag.split(/#(\d{4})$/).filter(x => x !== '')
	if (matches.length !== 2)
		throw new Error("Could not dissect tag properly")
	
	return {name: matches[0], discriminator: parseInt(matches[1])}
}

export function mentionToId(mentionStr: string): string {
	const matches = mentionStr.match(/[0-9]{18}/)
	if (!matches)
		throw new Error("Could not convert mention to id : incorrect argument")
	return matches[0]
}

// === functions to get a multiple members by a multiple identifiers ===

export async function getMembersByMentionIdNameTag (msg: DiscordenoMessage, args: string[]): Promise<Array<DiscordenoMember>> {
	let members: DiscordenoMember[] = []

	// iterate on argList
	for (const arg of args) {
		const member = await getMemberByMentionIdNameTag(arg, msg.guildId ?? 0n)
		if (member)
			members.push(member)
	}

	// remove duplicates with a filter based on a set of unique ids
	const uniqueIds = new Set<bigint>()
	members = members.filter(member => {
		// if the set already has the id, it's a duplicate
		const duplicate = !uniqueIds.has(member.id)
		uniqueIds.add(member.id)
		return duplicate
	})

	return members
}

// === function to get a single member by multiple identifiers ===

export async function getMemberByMentionIdNameTag (arg: string, guildID: bigint): Promise<DiscordenoMember | undefined> {
	if (isDiscordMention(arg))
		arg = mentionToId(arg)

	if (isDiscordId(arg))
		return await getMemberById(arg, guildID)

	if (isDiscordTag(arg))
		return await getMemberByTag(arg, guildID)

	return await getMemberByName(arg, guildID)
}

// === functions to get a single member by a single identifier ===

export async function getMemberById(id: string, guildID: bigint): Promise<DiscordenoMember | undefined> {
	let bigIntId = 0n
	try {
		bigIntId = BigInt(id)
	} catch {
		return undefined
	}

	// search member in cache by id
	const cacheMember: DiscordenoMember | undefined = cache.members.find(x => 
		x.guilds.has(guildID) &&
		x.id == bigIntId
	)
	if (cacheMember)
		return cacheMember

	// search member with a request by id
	const reqMember = 
		await getMember(guildID, bigIntId)
			.catch(()=>{
				console.log('└ Could not fetch member by ID : unknown ID')
			})

	if (reqMember)
		return reqMember

	// return undefined if no member found
	return undefined
}

export async function getMemberByTag(tag: string, guildID: bigint): Promise<DiscordenoMember | undefined> {
	// run through a function that return an array such as [name, discriminator]
	const splitTag = splitDiscordTag(tag)

	// search member in cache by name or nickname (not case sesitive and doesn't check diacritics)
	const cacheMember = cache.members.find ( x => 
		x.guilds.has(guildID) &&
		x.discriminator == splitTag.discriminator &&
		strNormalize(x.username) == strNormalize(splitTag.name)
	)
	if (cacheMember)
		return cacheMember

	// search member with a request by name or nickname
	const matches = await fetchMembers(guildID, 0, {query: splitTag.name, limit: 10})
	const reqMember = matches?.find((x: { discriminator: number }) => x.discriminator == splitTag.discriminator)
	if (reqMember)
		return reqMember
	
	return undefined
}

export async function getMemberByName(name: string, guildID: bigint): Promise<DiscordenoMember | undefined> {
	// search member in cache by name or nickname
	const cacheMember = cache.members.find(x => 
		x.guilds.has(guildID) &&
		(
			strNormalize(x.username) == strNormalize(name) ||
			x.name(guildID) == name
		)
	)
	if (cacheMember)
		return cacheMember

	// search member with a request by name or nickname
	const reqMembers = await fetchMembers(guildID, 0, {query: name, limit: 10})
	if (reqMembers)
		return reqMembers.first()

	return undefined
}

export function rmEmoteMentions(input: string): string{
	return input.replaceAll(/<(?::\w+:|@!*&*|#)[0-9]+>/gi, '')
}