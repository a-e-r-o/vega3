// Lib
import { Client, CommandClient, Interaction, Message } from "./deps.ts";
// Src
import { ready, loadConfig, onMsgCreate, onInteractionCreate, GuildSettingsService, initTemp, initLocalDb, Command, commandList,  } from './src/mod.ts'
// Slash commands
import { Interactions, InteractionHandlers, ComponentInteractionHandlers } from './src/interactions/interactions.ts'

// --- BEGIN ---

console.log('Initialization...')

// --- Prepair local DB and temp folders ---

initLocalDb()
await initTemp()


// --- Bot client and global context ---

export const CONTEXT = {
	config: await loadConfig(),
	guildSettingsService: new GuildSettingsService(),
	commands: Object.values(commandList) as Command[]
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

// Fired BEFORE interaction handler function
BOT.on('interactionCreate', (interaction: Interaction) => {
	onInteractionCreate(interaction)
})

// --- Interactions and interaction handlers ---

// Push all interactions
Interactions.forEach(command => {
	// If you want to create command globally, just remove 'Your Server/Guild ID' part
	// I recommend making it for only one guild for now because Global Slash Commands can take max 1 hour to come live.
	BOT.interactions.commands
		// TODO : see if possible with Harmony to require server wide permission for slash commands
		// else fork harmony and implement it
		.create(command, '376040838540820481')
		.then((cmd) => {
			// TODO : register in the DB cmd.id & cmd.guid to delete all commands when needed
			console.log(`Created Slash Command ${cmd.name}!`)
			//cmd.setPermissions([{id: '376040838540820481', type: "", permission: true}])
		})
		.catch((e) => console.log(`Failed to create command : ${command.name}`));
})

// Push all interaction handlers
InteractionHandlers.forEach(handler => {
	BOT.interactions.handlers.push(handler)
})

// Push all component interaction handlers
ComponentInteractionHandlers.forEach(handler => {
	BOT.interactions.componentHandlers.push(handler)
})

// --- Launch ---
BOT.connect()