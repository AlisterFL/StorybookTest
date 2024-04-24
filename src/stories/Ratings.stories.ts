import type { Meta, StoryObj } from '@storybook/svelte';
import { Ratings } from '@skeletonlabs/skeleton';

const meta = {
	title: 'SKELETON/Ratings',
	component: Ratings,
	tags: ['autodocs'],
	argTypes: {
	}
} satisfies Meta<Ratings>;

export default meta;
type Story = StoryObj<typeof meta>;


export const ratings: Story = {
	args: {
		value: 2,
		max: 5,
		interactive: false,
		text: "text-token",
		fill: "fill-token",
		justify: "justify-center",
		spacing: "space-x-2",
		regionIcon: "",
	}
};
