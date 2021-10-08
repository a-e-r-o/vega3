import { clear } from './admin/clear.ts'
import { avatar } from './general/avatar.ts'
import { help } from './general/help.ts'
import { horoscope } from './general/horoscope.ts'
import { random } from './general/random.ts'
import { invite } from './meta/invite.ts'
import { ip } from './meta/ip.ts'
import { shutdown } from './meta/shutdown.ts'
import { up } from './meta/up.ts'
import { dummy } from './meta/dummy.ts'

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
    up
]