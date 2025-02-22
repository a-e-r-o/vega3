import { ActionRowComponent, ButtonComponent, ButtonStyle, MessageComponentType, SelectComponent } from "../../../../deps.ts";

export const options = [
	{
		label: 'Option1',
		value: 'one1',
		default: true,
		description: 'The first option'
	},
	{
		label: 'Option2',
		value: 'two2',
		description: 'The second, more dangerous option'
	}
]

export const selectComponent: SelectComponent = {
	type: MessageComponentType.SELECT,
	customID: '10',
	options: options
};
export const buttonComponent: ButtonComponent = {
	type: MessageComponentType.Button,
	label: 'dummy',
	style: ButtonStyle.GREEN,
	customID: 'DummyValidateButtonClick',
	disabled: false
};
export const actionRowComponent: ActionRowComponent = {
	type: MessageComponentType.ACTION_ROW,
	components: [buttonComponent]
}

