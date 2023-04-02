export const strings: Record<string, Record<string, string>> = 
{
	commandDescriptions: {
		'clear': 'Deletes the last [given number] messages in the current channel. If no number given, deletes the 5 last messages.',
		'addtrigger': 'Add a trigger, a regex pattern to which the bot will react with the given response. Note that triggers are guild-wide.',
		'removetrigger': 'Remove an existing trigger for the current guild.',
		'triggerlist': 'Prints a list of all the triggers currently in place in this guild.',
		'8ball': 'A magical 8ball that answer any of your questions ! If you get tired of the magic ball giving vague answers, add ?? at the end of your question to force it to be more decisive.',
		'cointoss': 'Litterally a coin toss. What\'s more to say about this ?',
		'up': 'Show some informations about the bot, like version, up time and a link to the project\'s repository on Gitlab.',
		'randint': 'Give a random number between 1 to 6, or between the two given numbers.',
		'random': 'Selects at random between the options given.',
		'cipher': 'Cipher your message intoo enchantment table characters.',
		'decipher': 'Uncipher your message from enchantment table characters to normal letters.',
		'horoscope': 'Give your horoscope for the given sign. You can also give a number between 1 and 4 to get your horoscope for the following days.',
		'emotes': 'Creates and send a zip containing all the images from the emotes contained in your message, in full size PNG/GIF.'
	}
}