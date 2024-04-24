import type { Meta, StoryObj } from '@storybook/svelte';
import { Avatar } from '@skeletonlabs/skeleton';

const meta = {
	title: 'SKELETON/Avatar',
	component: Avatar,
	tags: ['autodocs'],
	argTypes: {
		rounded: {
			control: { type: 'select' },
			options: ['rounded-none', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl','rounded-2xl','rounded-3xl','rounded-full'],
			description: 'Rounded style for the avatar',
		},
		src: {
			control: { type: 'select' },
			options: ['', 'https://images.unsplash.com/photo-1617296538902-887900d9b592'],
			description: 'Avatar avec une image ou sans ',
		},
		cursor: {
			control: { type: 'select' },
			options: ['', 'cursor-pointer'],
			description: "Changement de l'état d pointeur",
			if: { arg: 'initials = CD' }
		},
	}
} satisfies Meta<Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AvatarWithInitial: Story = {
	args: {
		initials: "AB",
		fill: "fill-token",
		fontSize: 150,
		fallback: "",
		actionParams: "",
		background: "variant-filled-primary",
		width: "w-20",
		border: "border-4 border-primary-500 hover:!border-surface-300-600-token",
		rounded: "rounded-full",
		shadow: "",
		cursor: "cursor-pointer",
	}
};

export const AvatarWithPicture: Story = {
	args: {
		...AvatarWithInitial.args,
		src:"https://images.unsplash.com/photo-1617296538902-887900d9b592",
	}
};