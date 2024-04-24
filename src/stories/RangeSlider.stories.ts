import type { Meta, StoryObj } from '@storybook/svelte';
import { RangeSlider } from '@skeletonlabs/skeleton';

const meta = {
	title: 'SKELETON/RangeSlider',
	component: RangeSlider,
	tags: ['autodocs'],
	argTypes: {
		name: {
			description: "Requis, définissez un nom unique"
		},
		value: {
			description: "Valeur où se situe le slider"
		},
		min: {
			description: "Valeur minimum du slider"
		},
		max: {
			description: "Valeur maximal du slider"
		},
		step: {
			description: "Décallage entre chaque valeur du slider"
		},
		ticked: {
			description: "Affichage d'une règle"
		}
	}
} satisfies Meta<RangeSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const slider: Story = {
	args: {
		name: 'myRangeSlider', //obligatoire
		value: 50, 
		min: 0, 
		max: 100, 
		step: 1, 
		ticked: false, 
	}
};
