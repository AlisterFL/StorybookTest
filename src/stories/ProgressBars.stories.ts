import type { Meta, StoryObj } from '@storybook/svelte';
import { ProgressBar } from '@skeletonlabs/skeleton';

const meta = {
	title: 'SKELETON/ProgressBar',
	component: ProgressBar,
	tags: ['autodocs'],
	argTypes: {
	}
} satisfies Meta<ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const progressBarWithNoData: Story = {
	args: {
	}
};

export const progressBar: Story = {
	args: {
		value: 50,
		min: 0,
		max: 100,
		height: "h-2",
		rounded: "rounded-token",
		animIndeterminate: "anim-indeterminate",
		meter: "bg-surface-900-50-token",
		track: "bg-surface-200-700-token",
	}
};
