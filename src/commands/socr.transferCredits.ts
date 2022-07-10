import { Cmd, CmdCall, Ctx, fromWrittenNumber, toEasyReadNumber } from '../mod.ts'

export const transferCredits: Cmd = {
	aliases: ['give', 'giveCredits', 'transfer'],
	execute: async (ctx: Ctx, cmdCtx: CmdCall) => {
		
		// Check if receiver specified
		if (cmdCtx.msg.mentionedUserIds.length < 1)
			throw 'Please specify a receiver by mentionning him in the command.'

		// Check if amount is correct
		const amount = fromWrittenNumber(cmdCtx.args.join(' '))
		if (amount < 0.1 || isNaN(amount))
			throw 'Please specify a valid amount.'
		
		// Get citizens objects from DB
		const giver = await ctx.services.socialCreditsSevice.getCitizen(cmdCtx.msg.authorId);
		const receiver = await ctx.services.socialCreditsSevice.getCitizen(cmdCtx.msg.mentionedUserIds[0])

		// Call the service to update DB
		try {
			await ctx.services.socialCreditsSevice.transferCredits(giver, receiver, amount)
		} catch (e){
			throw e
		}

		return {
			title: 'Transfer successful',
			color: 8454080,
			description: `Your social credit score is now : **${toEasyReadNumber(giver.score)}**`
		}	
	}
}