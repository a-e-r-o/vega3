import Datastore from '../deps.ts'

export const horoDB = {
	users: new Datastore({ filename:"./database/horo_users.db", autoload: true })
}

export const socialCreditsDB = {
	users: new Datastore({ filename:"./database/socialCredits_citizens.db", autoload: true }),
}