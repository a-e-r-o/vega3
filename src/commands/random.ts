// Types
import { Message, sendMessage } from 'https://deno.land/x/discordeno@v8.0.0/mod.ts'
import { Call } from '../class/class.ts'
// cache
import { cache } from '../../main.ts'

cache.commands.set('random', {
	aliases: ['rand', 'random', 'choose'],
	permission: [0],
	main: (call: Call) => {
		let desc: string = ''

		// If first char of an arg is a dash, consider the first beginning of the description
		let descIndex: number = call.args.findIndex(x => x.match(/^--/))

		// If there is a desc, it is the one beginning with a dash and all the ones after it
		if (descIndex > 0) {
			// remove the separator from the arg to have a clean desc
			if (call.args[descIndex] === '') {
				// if it's only the separator by itself remove the arg altogether
				call.args.splice(descIndex, 1);
			} else {
				// else, remove the separator from the arg
				call.args[descIndex] = call.args[descIndex].replace(/^--/, '');
			}

			// join all args following the one with the separator
			desc = 
				call
					.args
					.splice(descIndex, call.args.length - descIndex)
					.join(' ')
		}

		// the remaining args after desc parsing are the options
		let options: Array<string> = call.args;
		
		// if there are less than 2 options, abort
		if (options.length < 1) {
			sendMessage(call.msg.channel, 'Error : no enough options provided');
			return
		}

		// select at random among the args
		let selectedItem: string = '=> ' + options[Math.floor(Math.random() * options.length)];
		
		// send result
		if (desc.length > 0) {
			sendMessage(call.msg.channel, desc + '\n' + selectedItem);
		} else {
			sendMessage(call.msg.channel, selectedItem);
		}
	}
})