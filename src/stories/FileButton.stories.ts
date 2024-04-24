import type { Meta, StoryObj } from '@storybook/svelte';
import { FileButton } from '@skeletonlabs/skeleton';

const meta = {
	title: 'SKELETON/FileButton',
	component: FileButton,
	tags: ['autodocs'],
	argTypes: {
	}
} satisfies Meta<FileButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const fileButton: Story = {
	args: {
		name: 'file button',
		button: 'btn variant-soft-primary',
	}
};
