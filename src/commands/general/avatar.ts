import { sendMessage, DiscordenoMember, cache } from '../../deps.ts'
import { getMembersByMentionIdNameTag } from '../../helpers/discord/discord.ts'
import { Ctx, Cmd, CmdCall } from "../../types/mod.ts";

export const avatar: Cmd = {
	aliases: ['avatar', 'pp'],
	clearance: 0,
	execute: async (ctx: Ctx, cmdCtx: CmdCall) => {
		// limit to 5 users at once to avoid sending to many requests
		if (cmdCtx.args.length > 5)
			throw 'Command limited to max 5 users at once'
			
		// search users
		const users: DiscordenoMember[] = await getMembersByMentionIdNameTag(cmdCtx.msg, cmdCtx.args)

		// If no users mentionned, or found
		if (users.length == 0){
			if (cmdCtx.args.length > 0)
				throw 'Could not find that user'

			const sender: DiscordenoMember | undefined = cache.members.get(BigInt(cmdCtx.msg.authorId))
			if (sender)
				users.push(sender)
		}

		// send links to profile pictures
		for (const user of users) {
			const link = user.avatarURL.replace(/=[0-8]+$/mu, '=2048')
			await sendMessage(BigInt(cmdCtx.msg.channelId), link)
		}
	}
}