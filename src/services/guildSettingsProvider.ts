import { PostgreClient } from "../../deps.ts";
import { GuildSettings, GuildSettingsDto } from "../mod.ts";

const dbStructure: Record<string, {table: string, cols: Record<string, string>}> = {
	guildSettings: {
		table: 'guid_settings',
		cols: {
			guildId: 'guild_id',
		}
	},
	trigger: {
		table: 'triggers',
		cols: {
			regex: 'regex_pattern',
			regexOptions: 'regex_options',
			response: 'response',
			triggerId: 'pattern_id',
			guildId: 'guild_id'
		}
	}
}

export class GuildSettingsProvider {
	private pgClient: PostgreClient

	constructor(dbConnectionString: string) {
		this.pgClient = new PostgreClient(dbConnectionString)
		this.pgClient.connect()
	}


	public async fetchAll(): Promise<GuildSettingsDto[]> {
		const result = await this.pgClient.queryObject<GuildSettingsDto>(
			`
				SELECT
					*
				FROM
					${dbStructure.guildSettings.table}
			`,
		)

		return result.rows
	}

	public async fetchOne(guildId: string): Promise<GuildSettings | null> {
		const result = await this.pgClient.queryObject<GuildSettingsDto>(
			`
				SELECT
					*
				FROM
					${dbStructure.guildSettings.table}
				WHERE
					${dbStructure.guildSettings.cols.guildId} = $1
			`,
			[guildId],
		)

		if (result.rows.length === 0) {
			return null
		}
		else {
			return result.rows[0].setting
		}
	}

	public async create(guildId: string, setting: GuildSettings): Promise<boolean> {
		const res = await this.pgClient.queryArray(
			`
				INSERT INTO ${dbStructure.guildSettings.table} (${dbStructure.guildSettings.cols.guildId}, setting)
				VALUES ($1, $2)
			`,
			[guildId, setting],
		);
		return (res.rowCount ?? 0) > 0
	}
	
	public async update(guildId: string, setting: GuildSettings): Promise<boolean> {
		const res = await this.pgClient.queryArray(
			`
				UPDATE ${dbStructure.guildSettings.table}
				SET setting = $1
				WHERE ${dbStructure.guildSettings.cols.guildId} = $2
			`,
			[setting, guildId],
		);
		return (res.rowCount ?? 0) > 0
	}
}