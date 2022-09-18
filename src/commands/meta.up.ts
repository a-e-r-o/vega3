import { version, msToTime, CmdCall, Cmd, Embed, botId, cache} from '../mod.ts'
import { ctx } from '../../main.ts'

export const up: Cmd = {
	aliases: ['up', 'uptime', 'stats', 'version'],
	execute: (call: CmdCall) => {
		const changelog = 'https://gitlab.com/AeroCloud/vega2/-/tags/' + version;

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
				value:  msToTime((new Date().getTime() - ctx?.upTime.getTime()))
			},
			{
				name: 'Changelog',
				value: changelog
			}
		]
		embed.footer = { text: 'v' + version }
		return embed
	}
}