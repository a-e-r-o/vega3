// cache
import { cache } from '../../main.ts'

cache.handlers.ready = () => {
	console.log('Vega2 is now operationnal');
}