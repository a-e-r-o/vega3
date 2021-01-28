import { Member, MentionedUser, cache, getMembersByQuery, Message, getMember } from "../../deps.ts"
import { strLowNoAccents } from './miscellaneous.ts'

// === misc utility functions ===

export function isDiscordId (testValue: string): boolean {
	return /[0-9]{18}/.test(testValue)
}

export function isDiscordMention(testValue: string): boolean {
	return /<(?:@)?(?:!)?[0-9]{18}>/.test(testValue)
}

export function isDiscordTag (testValue: string): boolean {
	return /.+#[0-9]{4}$/.test(testValue)
}

export function splitDiscordTag (tag: string): {name: string, discriminator: string} {
	const matches = tag.split(/#(\d{4})$/).filter(x => x !== '')
	if (matches.length !== 2)
		throw new Error("Could not dissect tag properly")
	return {name: matches[0], discriminator: matches[1]}
}

export function mentionToId(mentionStr: string): string {
	const matches = mentionStr.match(/[0-9]{18}/)
	if (!matches)
		throw new Error("Could not convert mention to id : incorrect argument")
	return matches[0]
}

// === functions to get a multiple members by a multiple identifiers ===

export async function getMembersByMentionIdNameTag (msg: Message, args: string[]): Promise<Array<Member>> {
	let members: Member[] = []

	// iterate on argList
	for (const arg of args) {
		const member = await getMemberByMentionIdNameTag(arg, msg.guildID)
		if (member)
			members.push(member)
	}

	// remove duplicates with a filter based on a set of unique ids
	const uniqueIds = new Set<string>()
	members = members.filter(member => {
		// if the set already has the id, it's a duplicate
		const duplicate = !uniqueIds.has(member.id)
		uniqueIds.add(member.id)
		return duplicate
	})

	return members
}

// === function to get a single member by multiple identifiers ===

export async function getMemberByMentionIdNameTag (arg: string, guildID: string): Promise<Member | undefined> {
	if (isDiscordMention(arg))
		arg = mentionToId(arg)

	if (isDiscordId(arg))
		return await getMemberById(arg, guildID)

	if (isDiscordTag(arg))
		return await getMemberByTag(arg, guildID)

	return await getMemberByName(arg, guildID)
}

// === functions to get a single member by a single identifier ===

export async function getMemberById(id: string, guildID: string): Promise<Member | undefined> {
	// search member in cache by id
	const cacheMember: Member | undefined = cache.members.find(x => 
		x.guilds.has(guildID) &&
		x.id == id
	)
	if (cacheMember)
		return cacheMember

	// search member with a request by id
	const reqMember = 
		await getMember(guildID, id)
			.catch(()=>{
				console.log('└ Could not fetch member by ID : unknown ID')
			})

	if (reqMember)
		return reqMember

	// return undefined if no member found
	return undefined
}

export async function getMemberByTag(tag: string, guildID: string): Promise<Member | undefined> {
	// run through a function that return an array such as [name, discriminator]
	const splitTag = splitDiscordTag(tag)

	// search member in cache by name or nickname (not case sesitive and doesn't check diacritics)
	const cacheMember = cache.members.find ( x => 
		x.guilds.has(guildID) &&
		x.discriminator == splitTag.discriminator &&
		strLowNoAccents(x.username) == strLowNoAccents(splitTag.name)
	)
	if (cacheMember)
		return cacheMember

	// search member with a request by name or nickname
	const matches = await getMembersByQuery(guildID, splitTag.name, 10)
	const reqMember = matches?.find(x => x.discriminator == splitTag.discriminator)
	if (reqMember)
		return reqMember
	
	return undefined
}

export async function getMemberByName(name: string, guildID: string): Promise<Member | undefined> {
	// search member in cache by name or nickname
	const cacheMember = cache.members.find(x => 
		x.guilds.has(guildID) &&
		(
			strLowNoAccents(x.username) == strLowNoAccents(name) ||
			x.name(guildID) == name
		)
	)
	if (cacheMember)
		return cacheMember

	// search member with a request by name or nickname
	const reqMembers = await getMembersByQuery(guildID, name)
	if (reqMembers)
		return reqMembers.first()

	return undefined
}