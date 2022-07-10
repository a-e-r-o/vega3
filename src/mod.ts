// Helpers
export * from './helpers/business/horoscope.ts'
export * from './helpers/business/dong.ts'
export * from './helpers/business/socialCredits.ts'
export * from './helpers/vega/config.ts'
export * from './helpers/vega/general.ts'
export * from './helpers/vega/format.ts'
export * from './helpers/discord/discord.ts'

// Dependencies
export * from '../deps.ts'

// Providers (database)
export * from './providers/local.ts'

// Services
export * from './services/business/horoscope.ts'
export * from './services/business/socialCredits.ts'

// handlers 
export * from './handlers/general/ready.ts'
export * from './handlers/guildMembers/guildMemberAdd.ts'
export * from './handlers/msg/msgCreate.ts'

// Types
export * from  './types/business/horoscope.ts'
export * from  './types/business/socialCredits.ts'
export * from  './types/general/vega.ts'

// Commands
import {clear} from './commands/admin/clear.ts'
import {avatar} from './commands/general/avatar.ts'
import {dong} from './commands/general/dong.ts'
import {help} from './commands/general/help.ts'
import {horoscope} from './commands/general/horoscope.ts'
import {random} from './commands/general/random.ts'
import {dummy} from './commands/meta/dummy.ts'
import {invite} from './commands/meta/invite.ts'
import {ip} from './commands/meta/ip.ts'
import {shutdown} from './commands/meta/shutdown.ts'
import {up} from './commands/meta/up.ts'
import {socialCredits} from './commands/socialCredits/socialCredits.ts'
import {transferCredits} from './commands/socialCredits/transferCredits.ts'

export const commandList = [
	clear,
	avatar,
	dong,
	help,
	horoscope,
	random,
	dummy,
	invite,
	ip,
	shutdown,
	up,
	socialCredits,
	transferCredits,
]