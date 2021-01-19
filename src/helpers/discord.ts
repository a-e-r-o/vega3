import * as Di from "../../deps.ts"

export class DiscordHelper {
	static isDiscordId (testValue: string): boolean {
		return testValue.match('[0-9]{18}') !== null;
	}

	static getMembersByNameIdMention(args: Array<string>): Array<Di.Member> {
		throw new Error('Not yet implemented');
		return [];
	}
}