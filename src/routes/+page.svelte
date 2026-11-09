<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageProps } from './$types.js';
    import bilbo from './mycomp.svelte'

    const { data }: PageProps = $props()
    let count = $state(0)
</script>

<h1>Welcome to SvelteKit, {data.username}</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<button onclick={() => count++ }>Count je {count}</button>

<form method="POST" action="?/brat" use:enhance>
    <input type="text" name="username">
    <input type="hidden" name="count" value={count} >
    <input type="submit" value="Šalji brate">
</form>

<form method="POST" action="?/sestra" use:enhance>
    <input type="text" name="username">
    <input type="submit" value="Šalji sestro">
</form>

