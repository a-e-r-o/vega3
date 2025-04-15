import { BOT, CONTEXT } from '../../../main.ts';
import { Command, CommandCall, parseUserIds, CommandTags } from '../../mod.ts'

export const avatar: Command = {
	tags: CommandTags.None,
	aliases: ['avatar', 'pp'],
	execute: async (call: CommandCall) => {
		// limit to 5 users at once to avoid sending to many requests
		if (call.args.length > 5)
			throw 'Command limited to max 5 users at once'
		else if (call.args.length === 0)
			call.args.push(call.msg.author.id)

		// user ids
		const userIds = parseUserIds(call.args)
		// response string
		let res = ''

		for (const id of userIds) {
			try {
				const user = await BOT.users.get(id)
				if (user?.avatar){
					res += user.avatarURL('png', 2048) + '\n'
				}
			}
			catch {
				throw 'Incorrect id specified'
			}
		}
			
		if (res)
			call.msg.channel.send(res)
		else
			throw 'Incorrect or missing user ids'
	}
}