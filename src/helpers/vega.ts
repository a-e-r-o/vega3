import { sendMessage, Message } from '../../deps.ts'
import { vegaMsgOptions } from '../types/common.ts'

export function send(content : string, channelID: string, options?: vegaMsgOptions): Promise<Message> {
	return sendMessage(
		channelID,
		content
	)
}

export function log(content : string): void {
	// not implemented
}