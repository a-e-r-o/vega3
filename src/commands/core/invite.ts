import { v, CommandCall, Command, CommandTags } from '../../mod.ts'

export const invite: Command = {
	tags: CommandTags.BotAdminRequired,
	aliases: ['invite','inv'],
	execute: (call: CommandCall) => {
		return {description: `https://discordapp.com/oauth2/authorize?client_id=${v.applicationId}&scope=bot`}
	}
}