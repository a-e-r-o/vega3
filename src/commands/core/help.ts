import { BOT, CONTEXT } from '../../../main.ts';
import { Command, CommandCall, CommandTags } from '../../mod.ts'
import { Embed, version } from '../../../deps.ts';
import { strings } from '../../assets/strings.ts'

export const help: Command = {
	tags: CommandTags.None,
	aliases: ['help', 'h'],
	execute: execute
}

function execute (call: CommandCall) {
	const self = BOT.user

	// Response embed
	const embed: Embed = new Embed(
		{
			title: "Commands available",
			color: 16316664,
			footer: { 
				text: "V E G A   v" + version,
				icon_url: self!.avatarURL()
			},
			fields: []
		}
	)

	// Order commands alphabetically
	CONTEXT.commands.sort(function(a, b) {
		return a.aliases[0].localeCompare(b.aliases[0]);
 	});

	// Populates the responsed embed
	CONTEXT.commands.forEach(cmd => {
		const commandId = cmd.aliases[0]
		const description = strings.commandDescriptions[commandId]
		
		if (description){
			embed.fields!.push({
				name: `\`▶ ${commandId}\``,
				value: `*(${cmd.aliases.join(', ')})*\n${description}`
			})
		}
	})

	return embed
}