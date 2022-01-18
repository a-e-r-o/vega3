import { fromWrittenNumber, toEasyReadNumber } from '../../helpers/mod.ts'
import { Cmd, CmdCall, Ctx} from '../../types/mod.ts'
import { creditsSrv } from '../../services/mod.ts'

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
		const giver = await creditsSrv.getCitizen(cmdCtx.msg.authorId);
		const receiver = await creditsSrv.getCitizen(cmdCtx.msg.mentionedUserIds[0])

		// Call the service to update DB
		try {
			await creditsSrv.transferCredits(giver, receiver, amount)
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