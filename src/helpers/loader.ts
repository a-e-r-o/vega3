import { EventHandlers, parse } from '../../deps.ts'
import { Config, Command } from '../types/common.ts'


// COMMANDS
export async function loadCommands(counter = 0): Promise<Map<string, Command>> {
	const commands = new Map<string, Command>()
	const mods = await importPath('./src/commands', counter)

	for (const mod of mods) {
		const cmd = mod.cmd as Command
		commands.set(cmd.aliases[0], cmd)
	}
	return commands
}

// HANDLERS
export async function  loadHandlers(): Promise<EventHandlers> {
	const handlers: Record<string, unknown> = {}
	const mods = await importPath('./src/handlers')

	for (const mod of mods) {
		const handler = mod.handler as {event: string, handler: unknown}
		handlers[handler.event] = handler.handler
	}
	return handlers
}

// CONFIG
export function loadConfig(): Config {
	try {
		return parse(Deno.readTextFileSync(Deno.realPathSync('./config/config.yaml'))) as Config
	} catch (_error){
		throw new Error(
			'\nError : config file could not be loaded \n' +
			`└ Make sure ${Deno.realPathSync('./')}/config/config.yaml exists and is correctly configured`
		)
	}
}

export async function importPath(path: string, counter = 0): Promise<Record<string, unknown>[]> {
	const files = Deno.readDirSync(Deno.realPathSync(path))
	let result = []

	for (const file of files) {
		if (!file.name) continue
		const currentPath = `${path}/${file.name}`

		if (file.isFile) {
			let path = `../../${currentPath}`
			if (counter > 0)
				path += `#${counter}`
			
			const subResult = await import(path)
			result.push(subResult)
			continue
		}

		const subResult = await importPath(currentPath, counter)
		result = [...result, ...subResult]
	}

	return result
}