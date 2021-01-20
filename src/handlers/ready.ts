// cache
import { cache } from '../../main.ts'
import { editBotsStatus, StatusTypes, ActivityType } from '../../deps.ts'

cache.handlers.ready = () => {
	console.log('Vega2 is now operationnal')
	editBotsStatus(StatusTypes.Online, `${cache.config.prefix}help`, ActivityType.Listening)
}