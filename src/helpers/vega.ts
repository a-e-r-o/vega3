import { sendMessage, getMessages, deleteMessages, getMember, Member, Channel } from '../../deps.ts'
import { vegaMsgOptions } from '../types/vegaMsgOptions.ts'
import { timeUtils } from './time.ts'

export class vega {
	public send(content : string, channelID: string, options: vegaMsgOptions = {}): void {
		sendMessage(
			channelID,
			content
		)
		return
	}

	public log(content : string, timeStamp: boolean = true): void {
		let str = content
		if (timeStamp)
			str = timeUtils.getFormattedTime() + str
		console.log(str)
	}
}