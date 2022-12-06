import { v, CmdCall, sendMessage, msToReadableDuration, readSet, saveSet, ReminderDto, Reminder, randomId } from '../mod.ts'

export class ReminderService {
	reminders: Reminder[] = []

	constructor(){
		const dbReminders = readSet('reminders') as ReminderDto[]
		for (const rmdr of dbReminders) {
			if (rmdr.targetTime <= (new Date).getTime()+1000)
				continue
			const newIndex = this.reminders.push(rmdr) - 1
			this.initReminder(newIndex)
		}
	}
	
	/**
	 * Creates a new subscription : parses call and if correct, creates timeout, creates sub entry in database
	 */
	newReminder(call: CmdCall, delay: number, message = ''): string {
		const userId = call.msg.authorId.toString()

		if (this.getReminders(userId).length >= 10)
			throw 'You can only have a maximum of 10 reminders active at once'
		
		// Gen new codes until a unique one for this user is found
		let code: string
		do 
			code = randomId(4)
		while (this.reminders.find(x => x.code == code && x.userId == userId))

		const rmdr: Reminder = {
			channelId: call.channel.toString(),
			code: randomId(4),
			userId: userId,
			message: message,
			targetTime: (new Date()).getTime() + delay
		}

		const newRmdrIndex = this.reminders.push(rmdr)
		this.initReminder(newRmdrIndex - 1)
		saveSet('reminders', this.reminders)

		return `${message ? '"**'+message+'**"': 'Reminder'} in ${msToReadableDuration(delay)}`
	}

	/**
	 * Used to handle reminder cancellation call by user
	 */
	cancelReminder(call: CmdCall): string {
		const userId = call.msg.authorId.toString()
		const code = call.args[1]
		const activeRmdr = this.getReminders(userId)

		if (activeRmdr.length == 0)
			throw 'You don\'t ahve any active reminder'
		
		if (activeRmdr.length < 2){
			this.deleteRmdr(userId, activeRmdr[0].code)
			return 'Reminder deleted'
		}

		if (!code)
			throw 'You have multiple active reminders. Please specify which one to clear.\nTry using `reminder list`'

		if (this.deleteRmdr(userId, code))
			return `Reminder deleted`
		else
			throw 'You don\'t have any reminder with this code'
	}

	/**
	* Returns a formatted list of all active reminders for a user
	*/
	listReminders(userId: bigint) {
		const list = this.getReminders(userId.toString())
		
		if (list.length == 0)
			return 'You don\'t have any active reminder'
		
		let res = ''
		list.forEach(rmdr => {
			res += `\`${rmdr.code}\`  ${rmdr.message ? '"'+rmdr.message+'"' : 'unnamed'}\n`
		})
		return res
	}

	/**
	* get all active reminders for active user
	*/
	private getReminders(userId: string) {
		return this.reminders.filter(x => x.userId == userId) ?? []
	}

	/**
	 * Delete a reminder in DB and memory
	 */
	private deleteRmdr(userId: string, rmdrCode: string) {
		const index = this.reminders.findIndex(x => x.userId + x.code === userId + rmdrCode)
		// Delete in memory
		if (index == -1)
			return false
		// Delete in memory and DB
		const rmdr = this.reminders.splice(index, 1)[0]
		clearTimeout(rmdr.timeOutId)
		saveSet('reminders', this.reminders)
		return true
	}
	
	/**
	 * Creates reminder in memory and init timeout
	 */
	private initReminder(rmdrIndex: number) {
		const rmdr = this.reminders[rmdrIndex]
		const delay = rmdr.targetTime - new Date().getTime()

		if (delay < 1000)
			return

		// Add Timeout in memory
		this.reminders[rmdrIndex].timeOutId = setTimeout(() => {
			// Send content
			sendMessage(
				v,
				BigInt(rmdr.channelId),
				{
					content: `<@!${rmdr.userId}> ${rmdr.message ? '**'+rmdr.message+'**' : 'Reminder'}`
				}
			)
			// Delete reminder after it has been fired
			this.deleteRmdr(rmdr.userId, rmdr.code)
		}, (rmdr.targetTime - (new Date).getTime()) )
	}
}