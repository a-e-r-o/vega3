import { v, Command, CommandCall, getAvatarURL, sendMessage, getUser, parseUserIds, CommandTags } from '../../mod.ts'

export const avatar: Command = {
	tags: CommandTags.None,
	aliases: ['avatar', 'pp'],
	execute: async (call: CommandCall) => {
		// limit to 5 users at once to avoid sending to many requests
		if (call.args.length > 5)
			throw 'Command limited to max 5 users at once'

		// user ids
		const userIds = parseUserIds(call.args)
		// response string
		let res = ''

		for (const id of userIds) {
			try {
				const user = await getUser(v, id)
				if (user.avatar){
					res += getAvatarURL(v, user.id, user.discriminator, {avatar: user.avatar, size: 2048}) + '\n'
				}
			}
			catch {
				throw 'Incorrect id specified'
			}
		}
			
		if (res)
			sendMessage(v, call.channel, {content: res})
		else
			throw 'Incorrect or missing user ids'
	}
}