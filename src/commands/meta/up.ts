import { sendMessage, Embed, botId, cache, parse } from '../../deps.ts'
import { CmdCall, Cmd, Ctx } from '../../types/mod.ts'
import { msToTime } from '../../helpers/mod.ts'

export const up: Cmd = {
	aliases: ['up', 'uptime', 'stats', 'version'],
	clearance: 0,
	execute: (ctx: Ctx, cmdCtx: CmdCall) => {
		const vFile: Record<string, unknown> = parse(Deno.readTextFileSync(Deno.realPathSync('./version.yaml'))) as Record<string, unknown>
		const version = vFile.version as string

		const embed: Embed = {}
		embed.thumbnail = {
			url: cache.members.get(botId)?.avatarURL || '',
		}
		embed.title = 'ᴠ.ᴇ.ɢ.ᴀ.'
		embed.color = 16316664
		embed.url= 'https://gitlab.com/AeroCloud/vega2'
		embed.fields = [
			{
				name: 'Uptime',
				value:  msToTime((new Date().getTime() - ctx.upTime.getTime()))
			}
		]
		embed.footer = { text: 'v' + version }
		
		sendMessage(cmdCtx.channel, {embed: embed})
	}
}