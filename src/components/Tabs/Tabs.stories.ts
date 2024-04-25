import type { Meta, StoryObj } from '@storybook/svelte';
import Tabs from './Tabs.svelte';

const meta = {
	title: 'Skeleton/Tabs',
	component: Tabs,
	tags: ['autodocs'],
	argTypes: {
		tabs: {
			description: 'Les onglets à afficher dans le TabGroup',
			control: { type: 'object' }
		},
		justify: {
			control: { type: 'radio' },
			options: ['justify-left', 'justify-center'],
			description: 'Position du tabs'
		},
		active: {
			control: { type: 'text' },
			description: 'Couleur active du TabGroup'
		},
		hover: {
			control: { type: 'text' },
			description: 'Couleur lors du hover sur un tab'
		},
		rounded: {
			control: { type: 'boolean' }
		},
    	padding: {
			control: { type: 'text' },
			description: 'padding entre les onglets'
		},
	}
} satisfies Meta<Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
	args: {
		tabs: [
			{ label: 'Tab 1', contents: 'Content for Tab 1' },
			{ label: 'Tab 2', contents: 'Content for Tab 2' },
			{ label: 'Tab 3', contents: 'Content for Tab 3' }
		],
		justify: 'justify-left',
		active: 'variant-filled-primary',
		hover: 'hover:variant-glass-primary',
    padding: 'px-4 py-2'
	}
};
