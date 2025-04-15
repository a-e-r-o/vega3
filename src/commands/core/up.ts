import { version, Embed } from '../../../deps.ts';
import { BOT, CONTEXT } from '../../../main.ts';
import { msToTime, CommandCall, Command, CommandTags} from '../../mod.ts'

export const up: Command = {
	tags: CommandTags.None,
	aliases: ['up', 'uptime', 'stats', 'version'],
	execute: (call: CommandCall) => {
		const changelog = 'https://gitlab.com/AeroCloud/vega2/-/tags/' + version

		const self = BOT.user

		if (!self)
			return

		const embed = new Embed()
		embed.thumbnail = {
			url: self.avatarURL()
		}
		embed.title = 'ᴠ.ᴇ.ɢ.ᴀ.'
		embed.color = 16316664
		embed.url= 'https://gitlab.com/AeroCloud/vega2'
		embed.fields = [
			{
				name: 'Uptime',
				value:  msToTime(BOT.uptime)
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