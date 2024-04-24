import type { Meta, StoryObj } from '@storybook/svelte';
import { ProgressRadial } from '@skeletonlabs/skeleton';

const meta = {
	title: 'SKELETON/ProgressRadial',
	component: ProgressRadial,
	tags: ['autodocs'],
	argTypes: {
	}
} satisfies Meta<ProgressRadial>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProgressRadialWithNoData: Story = {
	args: {
	}
};

export const progressRadial: Story = {
	args: {
		value: 25,
		stroke: 40,
		font: 56,
		strokeLinecap: "butt",
		transition: "transition-[stroke-dashoffset]",
		width: "w-36",
		meter: "stroke-surface-900 dark:stroke-surface-50",
		track: "stroke-surface-500/30",
		fill: "fill-token",
		labelledby: "",
	}
};
