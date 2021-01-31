import { parse } from '../../deps.ts'
// Types
import { sendMessage, Embed, botID, cache } from '../../deps.ts'
import { CmdContext } from '../class/common.ts'
// cache
import { botCache } from '../../main.ts'

botCache.commands.set('up', {
	aliases: ['up', 'uptime', 'stats'],
	clearance: 0,
	main: (cmdCtx: CmdContext) => {
		const vFile: Record<string, unknown> = parse(Deno.readTextFileSync(Deno.realPathSync('./version.yaml'))) as Record<string, unknown>
		const version = vFile.version as string

		const embed: Embed = {}
		embed.thumbnail = {
			url: cache.members.get(botID)?.avatarURL || '',
		}
		embed.title = 'V.E.G.A.'
		embed.color = 16316664
		embed.url= 'https://gitlab.com/AeroCloud/vega2'
		embed.footer = { text: 'v' + version }
		
		sendMessage(cmdCtx.msg.channelID, {embed: embed})
	}
})