import type { Meta, StoryObj } from '@storybook/svelte';
import { SlideToggle } from '@skeletonlabs/skeleton';

const meta = {
	title: 'SKELETON/SlideToggle',
	component: SlideToggle,
	tags: ['autodocs'],
	argTypes: {
        size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg'],
			description: 'Taille du slideToggle',
		},
        rounded: {
			control: { type: 'select' },
			options: ['', 'rounded-full'],
			description: 'slideToggle avec les bords arrondis',
		},
	}
} satisfies Meta<SlideToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const slideToggle: Story = {
	args: {
        name: 'slide-toggle',
        checked: true,
        background: 'bg-surface-400',
        active: 'bg-primary-600',
        border: '',
	}
};
