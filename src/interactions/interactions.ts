import { ApplicationCommandHandler, ApplicationCommand, ApplicationCommandPartial, ComponentInteractionHandler } from '../../deps.ts';
import { ClearMsgsHandler, ClearMsgsInteraction } from './ClearMessages/clearMsgs.ts';

import * as ket from './ketamine/ketamine.ts'

//import * as KetamineHandlers from './ketamine/handlers.ts'

export const Interactions: ApplicationCommandPartial[] = 
[
	ket.interaction,
	ClearMsgsInteraction
]

export const InteractionHandlers: ApplicationCommandHandler[] = 
[
	ket.handler,
	ClearMsgsHandler
]

export const ComponentInteractionHandlers: ComponentInteractionHandler[] = 
[
	ket.validateHandler
]