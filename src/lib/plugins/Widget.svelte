<script lang="ts">
    import widgets from '#config/plugins.client.ts';

    interface Props {
        plugin: string;
        id: string;
        data: any;
    }

    const { plugin, id, data }: Props = $props();

</script>