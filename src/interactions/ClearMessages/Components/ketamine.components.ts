import { ActionRowComponent, ButtonComponent, ButtonStyle, MessageComponentType, SelectComponent } from "../../../../deps.ts";

export const options = [
	{
		label: 'Ketamine',
		value: 'ket',
		default: true,
		description: 'to drive your honda civic better'
	},
	{
		label: 'Fentanyl',
		value: 'fent',
		description: 'die, you will'
	}
]

export const selectComponent: SelectComponent = {
	type: MessageComponentType.SELECT,
	customID: '10',
	options: options
};
export const buttonComponent: ButtonComponent = {
	type: MessageComponentType.Button,
	label: 'Ketamine',
	style: ButtonStyle.GREEN,
	customID: '112229907884085659',
	//url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRonKsMgGRfRj9KCQByj3C_I4FpkZYQWCfRiQ&s',
	disabled: false
};
export const actionRowComponent: ActionRowComponent = {
	type: MessageComponentType.ACTION_ROW,
	components: [buttonComponent]
}

