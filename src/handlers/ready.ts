// cache
import { botCache } from '../../main.ts'
import { editBotsStatus, StatusTypes, ActivityType } from '../../deps.ts'

botCache.handlers.ready = () => {
	console.log('∫ VEGA is now operationnal ∫\n')
	editBotsStatus(StatusTypes.Online, `${botCache.config.prefix}help`, ActivityType.Listening)
}