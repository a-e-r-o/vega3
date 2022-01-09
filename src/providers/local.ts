import Datastore from 'https://deno.land/x/dndb@0.3.3/mod.ts'
import { ensureDir } from '../deps.ts'

export async function initDb(){
	await ensureDir('./database')
}

/*
// TODO : find a better architecture for exporting dbstores. 
// This code is executed when file is loaded by executing any other function of the file,
// resulting in a crash because the database folder has not been created yet.

export const horoDB = {
	users: new Datastore({ filename:"./database/horo_users.db", autoload: true })
}

export const dongsDB = {
	users: new Datastore({ filename:"./database/dongs_users.db", autoload: true }),
	transations: new Datastore({ filename:"./database/dongs_transactions.db", autoload: true })
}
*/