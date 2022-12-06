export type ReminderDto = {
	channelId: string
	userId: string
	message: string
	targetTime: number
	code: string
}

export interface Reminder extends ReminderDto {
	timeOutId?: number
}