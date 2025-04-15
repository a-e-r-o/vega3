import { LangOption } from "../mod.ts";

export enum CommandTags {
	None = 0,
	Disabled = 1,
	DisabledInDm = 2,
	BotAdminRequired = 4,
	GuildAdminRequired = 8,
	GuildManageMsgRequired = 16,
}

/**
 * List of available languages. IMPORTANT : This list must be synchronised with the `Language` union type
 */
export const langOptions: LangOption[] = [
	{ id: 0, arg: 'en', name: 'English'},
	{ id: 1, arg: 'fr', name: 'Français'}
]