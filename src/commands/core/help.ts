import { Command, CommandCall, CommandTags, ctx, Embed, getAvatarURL, v, version } from '../../mod.ts'
import { strings } from '../../assets/strings.ts'

export const help: Command = {
	tags: CommandTags.None,
	aliases: ['help', 'h'],
	execute: execute
}

function execute (call: CommandCall) {
	const self = v.users.get(v.id)

	// Response embed
	const embed: Embed = {
		title: "Commands available",
		color: 16316664,
		footer: { 
			text: "V E G A   v" + version,
			iconUrl: getAvatarURL(v, self!.id, self!.discriminator, {avatar: self!.avatar, size: 2048})
		},
		fields: []
	}

	// Order commands alphabetically
	ctx.commands.sort(function(a, b) {
		return a.aliases[0].localeCompare(b.aliases[0]);
 	});

	// Populates the responsed embed
	ctx.commands.forEach(cmd => {
		const commandId = cmd.aliases[0]
		const description = strings.commandDescriptions[commandId]
		
		if (description){
			embed.fields!.push({
				name: '`'+commandId+'`',
				value: `> ${description}\n> \n> *Aliases : ${cmd.aliases.join(', ')}*`
			})
		}
	})

	return embed
}