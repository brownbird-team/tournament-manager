<script lang="ts">
    import widgets from '#config/plugins.client.ts';
    import UnknownWidget from './UnknownWidget.svelte';

    interface Props {
        plugin: string;
        id: string;
        data: any;
    }

    const { plugin, id, data }: Props = $props();

</script>