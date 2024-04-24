import type { Meta, StoryObj } from '@storybook/svelte';
import { ConicGradient } from '@skeletonlabs/skeleton';
import type { ConicStop } from '@skeletonlabs/skeleton';

const meta = {
	title: 'SKELETON/ConicGradient',
	component: ConicGradient,
	tags: ['autodocs'],
	argTypes: {
	}
} satisfies Meta<ConicGradient>;

export default meta;
type Story = StoryObj<typeof meta>;

export const conicGradient: Story = {
	args: {
		stops: [
			{label: 'One', color: 'rgb(var(--color-primary-500))', start: 0, end: 10 },
			{label: 'Two', color: 'rgb(var(--color-secondary-500))', start: 10, end: 35 },
			{label: 'Three', color: 'rgb(var(--color-tertiary-500))', start: 35, end: 100 }
			],
		name: 'conic-gradient',
		legend: false,
		spin: false,
		width: 'w-16',
		hover: 'bg-primary-hover-token',
		regionCone: 'rotate-0'
	}
};
