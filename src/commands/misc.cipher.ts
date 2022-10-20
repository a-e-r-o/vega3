import { Cmd, CmdCall } from '../mod.ts'

export const cipher: Cmd = {
	aliases: ['cipher', 'bloc', 'slice'],
	execute: (call: CmdCall) => {
		return cypher(call.msgStriped)
	}
}

export const decipher: Cmd = {
	aliases: ['decipher', 'unbloc', 'unslice'],
	execute: (call: CmdCall) => {
		return cypher(call.msgStriped, true)
	}
}

const blocs = '┡╅┮┟╹╿┴┾┯┇╇╽╋┙┄┌╀┠┕╆┲┦╶┧╎┣┪┫┎╌╍┤╵┊┝┈┃╁┏┆┘╻╷┹┿┷┰┱┬┽┵┚┉┗┶┻─▬┨╼│┛╴╂┸┐┋┢┖┺╾┭┅┳┒╄┥┓┞╺├╊╈┍╏┼┑╃└╸━╉┩≡−⌐'.split('')
const letters = 'abcdefghijklmnopqrstuvwxyz1234567890àâäéèêëîïôöùûüÿçABCDEFGHIJKLMNOPQRSTUVWXYZ-,;:!?()=#/\\\'*_%".'.split('')
function cypher(str = '', uncipher = false){
	let res = ''
	const [A, B] = uncipher ?  [letters, blocs] : [blocs, letters]
	for (let i = 0; i < str.length; i++) {
		const Bi = B.findIndex(x => x==str[i])
		if (Bi >= 0){
			res += A[Bi]
		} 
		else {
			res += str[i]
		}
	}
	return res
}