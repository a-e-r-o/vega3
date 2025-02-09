import { ChannelsManager, GuildChannelsManager, GuildManager } from "../../deps.ts";
import { BOT } from "../../main.ts";

async function DeleteMessages(){
	let channelManager = new ChannelsManager(BOT)
	let channel = await channelManager.get('1234')

	if (channel?.isText()){
		channel.send('Hello World!')
		let a = await channel.fetchMessages({limit: 20})
		a.forEach(async msg => {
			await msg.delete()
		})
	}

	const guildId = 'azeraezr'
	const guildManager = new GuildManager(BOT);
	const guild = await guildManager.get(guildId)


	if (guild){
		let a = new GuildChannelsManager(BOT, channelManager, guild);
		let b = await a.get('1234')
	}
}