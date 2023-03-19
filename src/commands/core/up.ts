import { v, ctx, version, msToTime, CmdCall, Cmd, Embed, getAvatarURL, CmdTags} from '../../mod.ts'

export const up: Cmd = {
	tags: CmdTags.None,
	aliases: ['up', 'uptime', 'stats', 'version'],
	execute: (call: CmdCall) => {
		const changelog = 'https://gitlab.com/AeroCloud/vega2/-/tags/' + version

		const self = v.users.get(v.id)

		if (!self)
			return

		const embed: Embed = {}
		embed.thumbnail = {
			url: getAvatarURL(v, self.id, self?.discriminator, {avatar: self.avatar, size: 2048})
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