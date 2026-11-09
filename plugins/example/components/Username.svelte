<script lang="ts">
    interface Props {
        username: string;
    }

    let { username }: Props = $props();
</script>

<div>@{username}</div>