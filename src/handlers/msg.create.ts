import { ctx, v, CmdCall, CmdTags, Cmd, Message, sendMessage, formatErr, formatWarn, parseCall, formatBasic } from '../mod.ts'

export async function msgCreate(msg: Message){
	// If message is from a bot
	if (msg.isFromBot)
		return
	
	// If msg doesn't start with prefix, ignore
	for(let j = 0; j < ctx.config.prefix.length; j++){
		if (msg.content?.[j].toLowerCase() != ctx.config.prefix[j].toLowerCase())
			return
	}

	// Create the cmdcall object that will be used for basically everything
	const call: CmdCall = parseCall(msg, ctx.config.prefix)
	const foundCmd: Cmd | undefined = ctx.commands.find(x => x.aliases.includes(call.cmd))

	// Check if command found
	if (!foundCmd)
		return
	// Check if command disabled
	if (foundCmd.tags & CmdTags.Disabled)
		return sendMessage(v, call.channel, {embeds: [formatWarn('I am sorry to inform you this command is not available at this time.')]})
	// Check clearance
	if (foundCmd.tags & CmdTags.IsAdmin && !ctx.config.admins.includes(call.msg.authorId.toString()))
		return sendMessage(v, call.channel, {embeds: [formatWarn('I am sorry to inform you do not have proper clearance to execute this command.')]})

	try {
		// Execute Command
		const feedback = await foundCmd.execute(call)
		// If return is just a string
		if (typeof feedback === 'string')
			return sendMessage(v, call.channel, {embeds: [formatBasic(feedback)]})
		// If return is not a string and not undefined, it's an embed
		if (typeof feedback !== 'undefined')
			return sendMessage(v, call.channel, {embeds: [feedback]})
	} catch (e){
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