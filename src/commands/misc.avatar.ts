import { Cmd, CmdCall, getMembersByMentionIdNameTag, sendMessage, DiscordenoMember, cache } from '../mod.ts'

export const avatar: Cmd = {
	disabled: true,
	aliases: ['avatar', 'pp'],
	execute: async (call: CmdCall) => {
		// limit to 5 users at once to avoid sending to many requests
		if (call.args.length > 5)
			throw 'Command limited to max 5 users at once'
			
		// search users
		const users: DiscordenoMember[] = await getMembersByMentionIdNameTag(call.msg, call.args)

		// If no users mentionned, or found
		if (users.length == 0){
			if (call.args.length > 0)
				throw 'Could not find that user'

			const sender: DiscordenoMember | undefined = cache.members.get(call.msg.authorId)
			if (sender)
				users.push(sender)
		}

		// send links to profile pictures
		for (const user of users) {
			const link = user.avatarURL.replace(/=[0-8]+$/mu, '=2048')
			await sendMessage(call.msg.channelId, link)
		}
	}
}