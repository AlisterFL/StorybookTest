<script lang="ts">

	import { Accordion, AccordionItem, Avatar, ConicGradient, FileButton, FileDropzone, RangeSlider, SlideToggle } from "@skeletonlabs/skeleton";
	import Tab from '../components/Tabs/Tabs.svelte'
	import type { ConicStop } from '@skeletonlabs/skeleton';


	const tabs = [
        { label: "Tab 1", contents: "(tab panel 1 contents)" },
        { label: "Tab 2", contents: "(tab panel 2 contents)" },
        { label: "Tab 3", contents: "(tab panel 3 contents)" }
    ];

	let value = 15;
	let max = 25;

	const conicStops: ConicStop[] = [
		{label: 'One', color: 'rgb(var(--color-primary-500))', start: 0, end: 10 },
		{label: 'Two', color: 'rgb(var(--color-secondary-500))', start: 10, end: 35 },
		{label: 'Three', color: 'rgb(var(--color-tertiary-500))', start: 35, end: 100 }
		];


</script>

<div class="container h-full mt-4 mx-auto flex justify-center items-center gap-4">
	<FileButton name="files" />
	<button type="button" class="btn variant-filled">Button</button>
</div>

<div class="container h-full w-full mt-4">
	<Tab {tabs} justify="justify-center" active="variant-filled-primary" hover="hover:variant-glass-primary" rounded={true} padding="px-10 py-2"/>
</div>

<div class="container h-full w-full mt-4">
	<RangeSlider label="test" name="range-slider" bind:value={value} max={max} step={1} accent='variant-filled-primary'>
		<div class="flex justify-between items-center">
			<div class="font-bold">Label</div>
			<div class="text-xs">{value} / {max}</div>
		</div>
	</RangeSlider>
</div>


<div class="container h-full w-full mt-4">
	<Avatar initials="JD" background="bg-primary-500" rounded="rounded-md" src="https://images.unsplash.com/photo-1617296538902-887900d9b592" cursor="cursor-pointer"/>
</div>

<div class="container h-full w-full mt-4">
	<Accordion>
		<AccordionItem open autocollapse>
			<svelte:fragment slot="lead">👨‍💻</svelte:fragment>
			<svelte:fragment slot="summary">Ceci est un test</svelte:fragment>
			<svelte:fragment slot="iconClosed">-</svelte:fragment>
			<svelte:fragment slot="iconOpen">+</svelte:fragment>
			<svelte:fragment slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis aliquid asperiores hic architecto quia tenetur nam minus quod ab fuga voluptates a repellat autem minima possimus et nemo, incidunt dolore!</svelte:fragment>
		</AccordionItem>
		<AccordionItem autocollapse>
			<svelte:fragment slot="lead">👨</svelte:fragment>
			<svelte:fragment slot="summary">Ceci est un test</svelte:fragment>
			<svelte:fragment slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis aliquid asperiores hic architecto quia tenetur nam minus quod ab fuga voluptates a repellat autem minima possimus et nemo, incidunt dolore!</svelte:fragment>
		</AccordionItem>
	</Accordion>

</div>

<div class="container h-full w-full mt-4">
	<SlideToggle name="test" active='bg-primary-600'/>
</div>

<div class="container h-full w-full mt-4">
	<ConicGradient stops={conicStops} legend hover='bg-secondary-hover-token' regionCone="rotate-90">(caption)</ConicGradient>
</div>

<div class="container h-full w-full mt-4">
	<FileButton name="test" button="btn variant-soft-primary">test</FileButton>
</div> 

<div class="container h-full w-full mt-4">
	<FileDropzone name="files">
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<svelte:fragment slot="message">Importer un document</svelte:fragment>
		<svelte:fragment slot="meta">(PNG ou JPEG)</svelte:fragment>
	</FileDropzone>
</div> 
