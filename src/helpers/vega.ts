import { sendMessage, getMessages, deleteMessages, getMember, Member, Channel, Message } from '../../deps.ts'
import { vegaMsgOptions } from '../types/vegaMsgOptions.ts'

export function send(content : string, channelID: string, options?: vegaMsgOptions): Promise<Message> {
	return sendMessage(
		channelID,
		content
	)
}

export function log(content : string): void {
	// not implemented
}