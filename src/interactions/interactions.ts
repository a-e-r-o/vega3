import { ApplicationCommandHandler, ApplicationCommand } from '../../deps.ts';
import { ClearMsgsHandler, ClearMsgsInteraction } from './ClearMessages/clearMsgs.interaction.ts';

import { KetamineHandler, KetamineInteraction } from './ketamine/ketamine.interaction.ts'

//import * as KetamineHandlers from './ketamine/handlers.ts'


export const Interactions = Object.values (
	[
		KetamineInteraction,
		ClearMsgsInteraction
	]
) as ApplicationCommand[]

export const InteractionHandlers = Object.values(
	[
		KetamineHandler,
		ClearMsgsHandler
	]
) as ApplicationCommandHandler[]