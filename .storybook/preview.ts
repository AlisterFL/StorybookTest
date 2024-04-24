import type { Preview, SvelteRenderer } from "@storybook/svelte";
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../src/app.postcss';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		}
	},
	decorators: [
		withThemeByDataAttribute<SvelteRenderer>({
			themes: {
				skeleton: 'skeleton'
			},
			defaultTheme: 'skeleton',
			parentSelector: 'body',
			attributeName: 'data-theme'
		})
	]
};

export default preview;
