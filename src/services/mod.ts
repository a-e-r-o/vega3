export * from './business/horoscope.ts'
export * from './business/socialCredits.ts'

import { SocialCreditsService } from "./business/socialCredits.ts";
import { HoroService } from "./business/horoscope.ts";

export const creditsSrv = new SocialCreditsService()
export const horoSrv = new HoroService()