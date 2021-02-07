import { sendMessage, Member, avatarURL, cache } from '../../deps.ts'
import { CmdContext, Command } from '../types/common.ts'
import { getMembersByMentionIdNameTag } from '../helpers/discord.ts'

export const cmd: Command = {
	aliases: ['avatar', 'pp'],
	clearance: 0,
	main: async (cmdCtx: CmdContext) => {
		// limit to 5 users at once to avoid sending to many requests
		if (cmdCtx.args.length > 5)
			throw 'Command limited maximum 5 users at once'
			
		// search users
		const users: Member[] = await getMembersByMentionIdNameTag(cmdCtx.msg, cmdCtx.args)

		// If no users mentionned, or found
		if (users.length == 0){
			if (cmdCtx.args.length > 0)
				throw 'Could not find that user'

			const sender: Member | undefined = cache.members.get(cmdCtx.msg.author.id)
			if (sender)
				users.push(sender)
		}

		// send links to profile pictures
		for (const user of users) {
			await sendMessage(cmdCtx.msg.channelID, avatarURL(user, 2048))
		}
	}
}