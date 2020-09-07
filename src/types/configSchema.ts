export interface ConfigSchema {
	token: string;
	prefix: string;
	owner: string;
}

export class Config implements ConfigSchema {
	public token!: string;
	public prefix!: string;
	public owner!: string;
}