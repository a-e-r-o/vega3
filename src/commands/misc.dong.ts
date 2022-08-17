import { sendMessage, Cmd, CmdCall, fetchDongRate, fromWrittenNumber, parseDongRate, toEasyReadNumber } from "../mod.ts"

export const dong: Cmd = {
	aliases: ['dong', 'dg', 'dng'],
	execute: async (cmdCtx: CmdCall) => {
		// Fetch and parse data
		const rawPriceData = await fetchDongRate()
		if (!rawPriceData)
			throw `\`\`\`fix\nAn error occured while fetching EUR to VDG exchange rate. Please try again later\`\`\``

		const rate = parseDongRate(rawPriceData)
		if (!rate)
			throw `\`\`\`fix\nAn error occured while parsing data to get EUR to VDG exchange rate. Please try again later\`\`\``

		// If no amount specified, send a message with current exchange rate
		if (!cmdCtx.args[0]){
			sendMessage(cmdCtx.channel, `1€ = ${toEasyReadNumber(rate)}₫`)
			return
		}

		// Parse base currency / 0=null, 1=VDG, 2=EUR
		let currency = 0
		if (cmdCtx.args.find(arg => arg.match(/d|dongs|dong|dng|vdg|₫/gi))) {
			currency = 1
		}
		else if (cmdCtx.args.find(arg => arg.match(/e|eu|eur|euro|euros|€/gi))) {
			currency = 2
		}
		else {
			//Default behaviour is : dongs => eur
			currency = 1
		}

		// Parse base amount
		// TODO : a cleaner handling of 'K' shorthand for thousands
		const amount = fromWrittenNumber(cmdCtx.args[0])
		if (amount < 0.1 || isNaN(amount))
			throw('Error : invalid amount')

		// Response msg for Dong
		if (currency == 1) {
			const eurValue = Math.round((amount/rate + Number.EPSILON) * 100) / 100
			sendMessage(cmdCtx.channel, `${toEasyReadNumber(amount)}₫ = ${eurValue > 0 ? toEasyReadNumber(eurValue) : '< 0.01'}€`)
			return
		}
		// Response msg for Euro
		if (currency == 2){
			sendMessage(cmdCtx.channel, `${toEasyReadNumber(amount)}€ = ${toEasyReadNumber(amount*rate)}₫`)
			return
		}

	}
}