<script lang="ts">
    interface Props {
        handle: string;
    }

    let { handle }: Props = $props();
</script>

<div>@{handle}</div>