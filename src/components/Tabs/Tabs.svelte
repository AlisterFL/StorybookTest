<script lang="ts">
    import { Tab, TabGroup } from "@skeletonlabs/skeleton";
    export let tabs: { label: string, contents: string }[] = [];

    let activeTabIndex: number = 0;

    export let justify: string;
    export let active: string;
    export let hover: string;
    export let rounded: boolean = false;
    export let padding: string;

    $: roundedClasses = rounded ? 'rounded-tl-container-token rounded-tr-container-token' : '';

</script>

<TabGroup justify={justify} active={active} hover={hover} rounded={roundedClasses} padding={padding}>
    {#each tabs as tab, index (tab.label)}
        <Tab bind:group={activeTabIndex} name={tab.label} value={index}>
            <span>{tab.label}</span>
        </Tab>
    {/each}
    
    <svelte:fragment slot="panel">
        {#each tabs as tab, index}
            {#if activeTabIndex === index}
                {tab.contents}
            {/if}
        {/each}
    </svelte:fragment>
</TabGroup>
