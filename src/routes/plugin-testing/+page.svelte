<script lang="ts">
    import type { PageData } from './$types';

    import widgetRegistry from '#config/plugins.client.ts';
    import RenderWidget from '#lib/plugins/components/RenderWidget.svelte';

    const { data }: { data: PageData } = $props();
    const widgets = $derived(data.widgetsSpec.map(s => widgetRegistry.resolve(s)));
</script>

{#each widgets as widget}
    <RenderWidget {widget} />
{/each}