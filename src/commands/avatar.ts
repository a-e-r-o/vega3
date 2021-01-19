// Types
import * as Dcd from '../../deps.ts'
import { Message, sendMessage, Member, Guild, avatarURL, getGuild, getMember, getMembersByQuery } from '../../deps.ts'
import { Call } from '../class/class.ts'
// cache
import { cache } from '../../main.ts'

cache.commands.set('avatar', {
	aliases: ['avatar', 'pp'],
	permission: [0],
	main: async (call: Call) => {

		let mentions: Array<Member> = [];

		// Parse mentions with user mentions
		if (call.msg.mentions.length > 0) {
			// For each user mentioned
			call.msg.mentions.forEach(mention => {
				let member = Dcd.cache.members.get(mention);
				if (member){
					mentions.push(member);
				}
				// remove arg from the call
				call.args = call.args.filter(item => item != mention);
			});
		}

		// Parse mentions with usernames
		if (call.args.length > 0) {
			for (let i = 0; i < call.args.length; i++) {
				// get member or members with that name
				let members: Dcd.Collection<string, Member> | undefined = await getMembersByQuery(call.msg.guildID, call.args[i]);

				if (members) {
					// push these members in the mentions
					members.forEach(member => {
						mentions.push(member);
					});
				}
			}
		}

		if (mentions.length > 0){
			// Send avatar for each mentionned user
			mentions.forEach(member => {
				sendMessage(call.msg.channelID, avatarURL(member, 2048))
			});
		} else if (call.args.length > 0) {
			// If there are args but no members mentions were fetched
			sendMessage(call.msg.channelID, 'I could not find this user');
		} else {
			// If there are no mentions and no args, show caller's avatar
			let member = Dcd.cache.members.get(call.msg.author.id);
			if (member)
				sendMessage(call.msg.channelID, avatarURL(member, 2048));
		}

	}
})