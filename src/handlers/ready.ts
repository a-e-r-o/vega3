// cache
import { botCache } from '../../cache.ts'
import { editBotStatus, DiscordStatusTypes, DiscordActivityTypes } from '../../deps.ts'

export const handler = {event: 'ready', handler: handle}

function handle() {
	console.log('∫ VEGA is now operationnal ∫\n')
	editBotStatus(
		{
			status: 'online', 
			activities: [
				{
					createdAt: (new Date()).getTime(),
					type: DiscordActivityTypes.Game,
					name: `${botCache.config.prefix}help`
				}
			]
		}
	)
}