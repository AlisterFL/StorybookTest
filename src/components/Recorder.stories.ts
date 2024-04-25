import type { Meta, StoryObj } from '@storybook/svelte';
import Recorder from './Recorder.svelte';

const meta = {
	title: 'Component/Recorder',
	component: Recorder,
	tags: [''],
	argTypes: {
        source : {
            description: 'Source of the recorder',
            control: { type: 'text' }
        },
        name : {
            description: 'Name of the recorder',
            control: { type: 'text' }
        },
        srcName : {
            description: 'Destination of the recorder',
            control: { type: 'text' }
        },

        }
	} satisfies Meta<Recorder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
	args: {
        source: '',
        name: 'recorder',
        srcName: ''
	}
};
