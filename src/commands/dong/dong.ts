import { sendMessage } from '../../deps.ts'
import { fetchDongRate, parseDongRate } from "../../helpers/mod.ts";
import { Cmd, CmdCall, Ctx } from "../../types/mod.ts"

export const dong: Cmd = {
	aliases: ['dong'],
	clearance: 0,
	execute: async (ctx: Ctx, cmdCtx: CmdCall) => {
		// Fetch and parse data
		const rawPriceData = await fetchDongRate()
		if (!rawPriceData)
			throw `\`\`\`fix\nAn error occured while fetching EUR to VDG exchange rate. Please try again later\`\`\``

		const rate = parseDongRate(rawPriceData)
		if (!rate)
			throw `\`\`\`fix\nAn error occured while parsing data to get EUR to VDG exchange rate. Please try again later\`\`\``

		// If no amount specified, send a message with current exchange rate
		if (!cmdCtx.args[0])
			return sendMessage (BigInt(cmdCtx.channel), `1€ = ${rate}₫`) 

		// Parse base currency / 0=null, 1=VDG, 2=EUR
		let currency = 0
		if (cmdCtx.args.find(arg => arg.match(/d|dongs|dong|dng|vdg|₫/gi))) {
			currency = 1
		}
		else if (cmdCtx.args.find(arg => arg.match(/e|eu|eur|euro|euros|€/gi))) {
			currency = 2
		}
		else {
			throw 'Please specify a currency (e,eu,eur,euro,euros,€ or d,dongs,dong,dng,vdg,₫)'
		}

		// Parse base amount
		let amount = parseFloat(cmdCtx.args[0])
		if (amount < 0.1 || isNaN(amount))
			throw('Error : invalid amount')

		// Response msg for Dong
		if (currency == 1)
			return sendMessage(cmdCtx.channel, `${amount}₫ = ${Math.round((amount/rate + Number.EPSILON) * 100) / 100}€`)
		// Response msg for Euro
		if (currency == 2)
			return sendMessage(cmdCtx.channel, `${amount}€ = ${amount*rate}₫`)
	}
}