import type { Meta, StoryObj } from '@storybook/svelte';
import { FileDropzone } from '@skeletonlabs/skeleton';

const meta = {
	title: 'SKELETON/FileDropzone',
	component: FileDropzone,
	tags: ['autodocs'],
	argTypes: {
	}
} satisfies Meta<FileDropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const fileDropzone: Story = {
	args: {
		name: 'file dropzone',
	}
	
};
