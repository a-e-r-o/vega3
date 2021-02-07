// cache
import { botCache } from '../../cache.ts'
import { editBotsStatus, StatusTypes, ActivityType } from '../../deps.ts'

export const handler = {event: 'ready', handler: handle}

function handle() {
	console.log('∫ VEGA is now operationnal ∫\n')
	editBotsStatus(StatusTypes.Online, `${botCache.config.prefix}help`, ActivityType.Listening)
}