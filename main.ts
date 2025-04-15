// Lib
import { Client, ensureDirSync, Interaction, Message } from "./deps.ts";
// Src
import { ready, loadConfig, onMsgCreate, onInteractionCreate, GuildSettingsService, initTemp, Command, commandList, VegaAppCommand, clearDir, consts } from './src/mod.ts'
// Slash commands
import { appCommandList, interactionHandlerList, componentInteractionHandlerList} from './src/interactions/interactions.ts'


// --- BEGIN ---

console.log('Initialization...')

// --- Prepair and clear temp folder, and read config file ---

ensureDirSync(consts.tmpDir)
await clearDir(consts.tmpDir)
const config = await loadConfig()

// --- Create global context and bot client---
export const CONTEXT = {
	config: config,
	guildSettingsService: new GuildSettingsService(config.dbConnectionString),
	commands: Object.values(commandList) as Command[],
	interactions: {} as Record<string, VegaAppCommand>,
}

export const BOT = new Client({
  intents: ['GUILDS', 'DIRECT_MESSAGES', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'MESSAGE_CONTENT'],
	token: CONTEXT.config.token
})

// --- Event handlers ---

// On client ready (Identified through gateway / Resumed)
BOT.on('ready', () => {
  ready()
})

// On message created by anyone, anywhere
BOT.on('messageCreate', (message: Message) => {
	onMsgCreate(message)
})

// Clear default handler then override it
BOT.off('interactionCreate') 
BOT.on('interactionCreate', (interaction: Interaction) => {
	onInteractionCreate(interaction)
})

// --- Interactions and interaction handlers ---

// Push all interactions
appCommandList.forEach(VegaAppCommand => {
	// If you want to create command globally, just remove 'Your Server/Guild ID' part
	// I recommend making it for only one guild for now because Global Slash Commands can take max 1 hour to come live.
	BOT.interactions.commands
		// TODO : see if possible with Harmony to require server wide permission for slash commands
		// else fork harmony and implement it
		.create(VegaAppCommand.appCommand, '376040838540820481')
		.then((registeredCommand) => {
			console.log(`Created Slash Command ${registeredCommand.name}!`)
			CONTEXT.interactions[registeredCommand.id] = VegaAppCommand;
		})
		.catch((e) => console.log(`Failed to create command : ${VegaAppCommand.appCommand.name}`));
})

// Push all interaction handlers
interactionHandlerList.forEach(handler => {
	BOT.interactions.handlers.push(handler)
})

// Push all component interaction handlers
componentInteractionHandlerList.forEach(handler => {
	BOT.interactions.componentHandlers.push(handler)
})

// --- Launch ---
BOT.connect()