import { BOT } from '../../../main.ts';
import { Embed } from '../../../deps.ts';
import { CommandCall, Command, CommandTags } from '../../mod.ts'

export const invite: Command = {
	tags: CommandTags.BotAdminRequired,
	aliases: ['invite','inv'],
	execute: (call: CommandCall) => {
		return new Embed({description: `https://discordapp.com/oauth2/authorize?client_id=${BOT.applicationID}&scope=bot`})
	}
}