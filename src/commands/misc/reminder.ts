import { Cmd, CmdCall, strNormalize, ctx } from '../../mod.ts'

export const reminder: Cmd = {
	tags: 0,
	aliases: ['timer','reminder', 'remindme'],
	execute: async(call: CmdCall) => {
		if (!call.args[0])
			throw 'Missing arguments'

		// Check if cancellation
		if (strNormalize(call.args[0]).match(/clear|cancel|remove|delete/i))
			return await ctx.reminderService.cancelReminder(call)

		if (strNormalize(call.args[0]).match(/list/i))
			return await ctx.reminderService.listReminders(call.msg.authorId)
	
		const sec = parseInt(call.args[0].match(new RegExp('([0-9])+s(ec)?', 'gmi'))?.[0].replace(/[a-z]/gmi, '') ?? '0') * 1000;
		const min = parseInt(call.args[0].match(new RegExp('([0-9])+m(in)?', 'gmi'))?.[0].replace(/[a-z]/gmi, '') ?? '0') * 60000;
		const hours = parseInt(call.args[0].match(new RegExp('([0-9])+h(ours)?', 'gmi'))?.[0].replace(/[a-z]/gmi, '') ?? '0') * 3600000;
		const days = parseInt(call.args[0].match(new RegExp('([0-9])+d(ays)?', 'gmi'))?.[0].replace(/[a-z]/gmi, '') ?? '0') * (3600000*24);
		
		const message =  call.args.length > 1 ? call.args.splice(1, call.args.length).join(' ') : ''

		// Parse delay
		const delay = sec + min + hours + days

		// If not delay, warn user
		if (!delay || delay < 1000)
			throw 'Please specify a duration (minimum 1 second)'

		return ctx.reminderService.newReminder(call, delay, message)
	}
}