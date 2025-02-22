import { CommandCall, CommandTags, formatErr, formatWarn, formatBasic, checkTriggers, Command } from '../mod.ts'
import { Embed, Message } from '../../deps.ts'
import { CONTEXT, BOT } from '../../main.ts'

export async function onMsgCreate(msg: Message){
	// If message is from a bot, ignore
	if (msg.author.bot || !msg.guildID)
		return

	const guildSettings = CONTEXT.guildSettingsService.getGuildSettings(msg.guildID)

	// Only in guilds, check if message triggers patterns
	if (guildSettings) {
		const response = checkTriggers(msg, guildSettings)
		if (response)
			return msg.channel.send(response)
	}

	// If message content is too short, it can't be a command so ignore it
	// We do this check after trigger check because some patterns are shorter than the bot prefix
	if (msg.content.length < CONTEXT.config.prefix.length)
		return
	
	// If msg doesn't start with prefix, ignore
	for(let j = 0; j < CONTEXT.config.prefix.length; j++){
		if (msg.content?.[j].toLowerCase() != CONTEXT.config.prefix[j].toLowerCase())
			return
	}

	// Create the cmdcall object that will be used for basically everything
	const call = new CommandCall(msg, CONTEXT.config.prefix, guildSettings)
	const foundCmd: Command | undefined = CONTEXT.commands.find(x => x.aliases.includes(call.commandName))

	// Check if any command alias is recognized
	if (!foundCmd)
		return

	// Check if command disabled
	if (foundCmd.tags & CommandTags.Disabled)
		return msg.channel.send({embeds: [formatWarn('This command is disabled')]})
		//return sendMessage(BOT, call.channel, {embeds: [formatWarn('This command is disabled')]})

	// Check if command is disabled in DMs. If so, check if we are in a guild
	if (foundCmd.tags & CommandTags.DisabledInDm) {
		if (!call.message.guildID)
			return msg.channel.send({embeds: [formatWarn('Command disabled in direct messages')]})
			//return sendMessage(BOT, call.channel, {embeds: [formatWarn('Command disabled in direct messages')]})
	}

	// Check if admin permissions are required. If so, check if user has admin permissions
	if (foundCmd.tags & CommandTags.BotAdminRequired){
		if (!CONTEXT.config.admins.includes(call.message.author.id))
			return msg.channel.send({embeds: [formatWarn('You are not allowed to execute this command')]})
			//return sendMessage(BOT, call.channel, {embeds: [formatWarn('You are not allowed to execute this command')]})
	}

	try {
		// Execute Command
		const feedback = await foundCmd.execute(call)
		// If return is just a string
		if (typeof feedback === 'string')
			return msg.channel.send({embeds: [formatBasic(feedback)]})
			//return sendMessage(BOT, call.channel, {embeds: [formatBasic(feedback)]})
		// If return is not a string and not undefined, it's an embed
		if (typeof feedback !== 'undefined')
			return msg.channel.send({embeds: [feedback]})
			//return sendMessage(BOT, call.channel, {embeds: [feedback]})
	}
	catch (error: Error | string | unknown) {
		// If the object caught is an error and not a string, then it not expected
		if (error instanceof Error){
			console.log(
				`Error executing command : ${call.commandName} with args [${call.args.join(',')}]\n`,
				`└ ${error.message}`
			)
			return msg.channel.send({embeds: [formatErr(`[Critical error]\n${error.message}`)]})
		}
		// If error was thrown volontarily
		else if (typeof error === 'string') {
			return msg.channel.send({embeds: [formatWarn(error)]})
		}
		// If error wasn't expected
		else {
			return msg.channel.send({embeds: [formatWarn('Unkown error')]})
		}
	}
}



//enum Status { Unknown = 0, New = 1 << 0, Dirty = 1 << 1, InError = 1 << 2, Processing = 1 << 3, PersistedEntity = 1 << 4 }
// // New + Dirty value = Status.New; // Only new
// let value: Status = Status.New; console.log("Only new", value); value = Status.New | Status.Dirty; 
// // Not the right way console.log("Is it new?", Status.New === (value & Status.New)); // Right way console.log("Is it processing?", Status.Processing === (value & Status.Processing)); value &= ~Status.Processing;
// value |= Status.Processing; console.log("New and processing", value); console.log("Is it new?", value === Status.New);
// 
// // Check bit : (value & bitValue) return bit value if true, return 0 if false
// console.log("Is it new?", Status.New === (value & Status.New))