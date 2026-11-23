<script lang="ts">
    import type { PageProps } from './$types';
    import RenderWidget from '#lib/plugins/components/RenderWidget.svelte';
    import widgetRegistry from '#config/plugins.client.ts';

    const { data }: PageProps = $props();

    const widgets = $derived(data.widgets.map(
        spec => widgetRegistry.resolve(spec)
    ));
</script>

<div class="container">
    <h2>Login with</h2>
    <div class="login-widgets">
        {#each widgets as widget}
            <RenderWidget {widget} />
        {/each}
    </div>
</div>

<style>
    .login-widgets {
        width: min(20rem, 100%);   
    }

    .container {
        margin-top: 2rem;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>