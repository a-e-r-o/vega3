import { ApplicationCommandPartial, Embed } from '../../deps.ts'
import { CommandCall, CommandTags } from '../mod.ts';

export type Command = {
	/**
	 * Options for the command. Mainly used for execution conditions
	 */
	tags: CommandTags
	/** 
	 * Aliases used to invoke the command. The first alias doubles as an ID for the command
	 */
	aliases: string[]
	/**
	 * Main part of the command : the function executed when the command is invoked
	 * @param call object containing all the data parsed from the message used to invoke the command
	 * @returns 
	 */
	execute: (call: CommandCall) => Promise<Embed|string|void>|Embed|void|string
}


export interface IntCommand {
	superAdmin: boolean
	permissions: []
	interaction: ApplicationCommandPartial
}