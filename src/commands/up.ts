import { sendMessage, Embed, botID, cache, parse } from '../../deps.ts'
import { CmdContext, Command } from '../types/common.ts'

export const cmd: Command = {
	aliases: ['up', 'uptime', 'stats', 'version'],
	clearance: 0,
	main: (cmdCtx: CmdContext) => {
		const vFile: Record<string, unknown> = parse(Deno.readTextFileSync(Deno.realPathSync('./version.yaml'))) as Record<string, unknown>
		const version = vFile.version as string

		const embed: Embed = {}
		embed.thumbnail = {
			url: cache.members.get(botID)?.avatarURL || '',
		}
		embed.title = 'ᴠ.ᴇ.ɢ.ᴀ.'
		embed.color = 16316664
		embed.url= 'https://gitlab.com/AeroCloud/vega2'
		embed.footer = { text: 'v' + version }
		
		sendMessage(cmdCtx.msg.channelID, {embed: embed})
	}
}