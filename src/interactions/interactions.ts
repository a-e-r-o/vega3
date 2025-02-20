import { ApplicationCommandHandler, ApplicationCommand, ApplicationCommandPartial, ComponentInteractionHandler } from '../../deps.ts';

import * as dummy from './dummy/dummy.ts'
import * as clearMsgs from './ClearMessages/clearMsgs.ts'

//import * as KetamineHandlers from './ketamine/handlers.ts'

export const Interactions: ApplicationCommandPartial[] = 
[
	dummy.interaction,
	clearMsgs.interaction
]

export const InteractionHandlers: ApplicationCommandHandler[] = 
[
	dummy.handler,
	clearMsgs.handler
]

export const ComponentInteractionHandlers: ComponentInteractionHandler[] = 
[
	dummy.validateHandler
]