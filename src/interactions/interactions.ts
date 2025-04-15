import { ApplicationCommandHandler, ApplicationCommandPartial, ComponentInteractionHandler } from '../../deps.ts';
import { VegaAppCommand } from '../mod.ts';

import * as dummy from './dummy/dummy.ts'
import * as clearMsgs from './ClearMessages/clearMsgs.ts'
import * as reset from './ResetInteractions/reset.ts'

//import * as KetamineHandlers from './ketamine/handlers.ts'

export const appCommandList: VegaAppCommand[] = 
[
	dummy.interaction,
	clearMsgs.interaction,
	reset.interaction
]

export const interactionHandlerList: ApplicationCommandHandler[] = 
[
	dummy.handler,
	clearMsgs.handler,
	reset.handler
]

export const componentInteractionHandlerList: ComponentInteractionHandler[] = 
[
	dummy.validateHandler
]