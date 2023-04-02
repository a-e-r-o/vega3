import { ctx, v, CommandCall, CommandTags, Command, Message, sendMessage, formatErr, formatWarn, parseCall, formatBasic, checkTriggers } from '../mod.ts'

export async function msgCreate(msg: Message){
	// If message is from a bot, ignore
	if (msg.isFromBot)
		return

	const guildSettings = ctx.guildSettingsService.getGuildSettings(msg.guildId ?? 0n)
	
	// Only in guilds, check if message triggers patterns
	if (msg.guildId) {
		const response = checkTriggers(msg, guildSettings)
		if (response)
			return sendMessage(v, msg.channelId, {content: response})
	}

	// If message content is too short, it can't be a command so ignore it
	// We do this check after trigger check because some patterns are shorter than the bot prefix
	if (msg.content.length < ctx.config.prefix.length)
		return
	
	// If msg doesn't start with prefix, ignore
	for(let j = 0; j < ctx.config.prefix.length; j++){
		if (msg.content?.[j].toLowerCase() != ctx.config.prefix[j].toLowerCase())
			return
	}

	// Create the cmdcall object that will be used for basically everything
	const call: CommandCall = parseCall(msg, ctx.config.prefix, guildSettings)
	const foundCmd: Command | undefined = ctx.commands.find(x => x.aliases.includes(call.cmd))

	// Check if command found
	if (!foundCmd)
		return

	// Check if command disabled
	if (foundCmd.tags & CommandTags.Disabled)
		return sendMessage(v, call.channel, {embeds: [formatWarn('This command is disabled')]})

	// Check if command is disabled in DMs. If so, check if we are in a guild
	if (foundCmd.tags & CommandTags.DisabledInDm) {
		if (!call.msg.guildId)
			return sendMessage(v, call.channel, {embeds: [formatWarn('Command disabled in direct messages')]})
	}

	// Check if admin permissions are required. If so, check if user has admin permissions
	if (foundCmd.tags & CommandTags.BotAdminRequired){
		if (!ctx.config.admins.includes(call.msg.authorId.toString()))
			return sendMessage(v, call.channel, {embeds: [formatWarn('You are not allowed to execute this command')]})
	}

	try {
		// Execute Command
		const feedback = await foundCmd.execute(call)
		// If return is just a string
		if (typeof feedback === 'string')
			return sendMessage(v, call.channel, {embeds: [formatBasic(feedback)]})
		// If return is not a string and not undefined, it's an embed
		if (typeof feedback !== 'undefined')
			return sendMessage(v, call.channel, {embeds: [feedback]})
	}
	catch (e) {
		// If the object caught is an error and not a string, then it is critical
		if (e instanceof Error){
			console.log(
				`Error executing command : ${call.cmd} with args [${call.args.join(',')}]\n`,
				`└ ${e.message}`
			)
			return sendMessage(v, call.channel, {embeds: [formatErr(`[Critical error]\n${e.message}`)]})
		}

		return sendMessage(v, call.channel, {embeds: [formatWarn(e)]})
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