import { ApplicationCommandPartial, ComponentInteractionHandler, CommandClient, ApplicationCommandHandler, Interaction } from "./deps.ts";
import { ready, loadConfig, msgCreate, GuildSettingsService, initTemp, initLocalDb, Command, commandList } from './src/mod.ts'

import * as InteractionList from './src/interactions/interactionList.ts'
import * as InteractionHandlerList from './src/interactions/interactionHandlerList.ts'

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

export const BOT = new CommandClient({
  prefix: ['yoda'],
  caseSensitive: false,
  intents: ['GUILDS', 'DIRECT_MESSAGES', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'MESSAGE_CONTENT'],
	token: CONTEXT.config.token
})


// --- Event handlers ---

// On client ready (Identified through gateway / Resumed)
BOT.on('ready', () => {
  ready()
})

// On message created by anyone, anywhere
BOT.on('messageCreate', (message) => {
	msgCreate(message)
})


// --- Interactions and interaction handlers ---

const Interactions = Object.values(InteractionList) as ApplicationCommandPartial[]
const InteractionHandlers = Object.values(InteractionHandlerList) as ApplicationCommandHandler[]

// Push all interactions
Interactions.forEach(command => {
	// If you want to create command globally, just remove 'Your Server/Guild ID' part
	// I recommend making it for only one guild for now because Global Slash Commands can take max 1 hour to come live.
	BOT.interactions.commands
		.create(command, '376040838540820481')
		.then((cmd) => console.log(`Created Slash Command ${cmd.name}!`))
		.catch(() => console.log(`Failed to create command : ${command.name}`));
})

// Push all interaction handlers
InteractionHandlers.forEach(handler => {
	BOT.interactions.handlers.push(handler)
})

let ketHandler:ComponentInteractionHandler = {
	customID: '112229907884085659',
	type: 'button',
	handler: (i: Interaction)=> {
		if (i.message){
			i.message.delete()
		}
		i.message?.channel.send('Good job, here\'s your ketamine \n (*`2g`* of ketamine added to your inventory)')
	}
} 
BOT.interactions.componentHandlers.push(ketHandler)


// --- Launch ---
BOT.connect()


// -- Discordeno bot

/*
// Create bot object
export const v = createBot({
  token: ctx.config.token,
  intents: Intents.Guilds + Intents.GuildMessages + Intents.DirectMessages + Intents.GuildMembers + Intents.MessageContent,
  events: createEventHandlers({
		ready: () => { ready() },
		messageCreate: (bot, msg) => { msgCreate(msg) },
		guildMemberAdd: (bot, member, user) => { guildMemberAdd(member, user) }
	}),
}) as BotWithCache

// Add plugins
enableHelpersPlugin(v)
enableCachePlugin(v)
enableCacheSweepers(v)
enablePermissionsPlugin(v)

// Start bot
startBot(v)*/