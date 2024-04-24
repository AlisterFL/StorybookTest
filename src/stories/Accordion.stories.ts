import type { Meta, StoryObj } from '@storybook/svelte';
import { Accordion } from '@skeletonlabs/skeleton';

const meta = {
	title: 'SKELETON/Accordion',
	component: Accordion,
	tags: ['autodocs'],
	argTypes: {}
} satisfies Meta<Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const accordion: Story = {
	args: {
	}
};