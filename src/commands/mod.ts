// Admin
import { clear } from './admin/clear.ts'
// General
import { avatar } from './general/avatar.ts'
import { help } from './general/help.ts'
import { horoscope } from './general/horoscope.ts'
import { random } from './general/random.ts'
// Meta
import { invite } from './meta/invite.ts'
import { ip } from './meta/ip.ts'
import { shutdown } from './meta/shutdown.ts'
import { up } from './meta/up.ts'
import { dummy } from './meta/dummy.ts'
// Dong
import { dong } from './general/dong.ts'
import { socialCredits } from './socialCredits/socialCredits.ts'
import { transferCredits } from './socialCredits/transferCredits.ts'

export const cmdList = [
	clear,
	avatar,
	help,
	random,
	horoscope,
	invite,
	ip,
	shutdown,
	dummy,
	up,
	dong,
	socialCredits,
	transferCredits
]