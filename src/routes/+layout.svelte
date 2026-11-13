<script lang="ts">

	import Header from '#lib/components/Header.svelte';
	import type { LayoutProps } from './$types';
	import logo from '#lib/assets/logoTemporary.svg'
	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={logo} />
</svelte:head>

<div class="app_container">
	<main>
		<Header />
        {@render children()}
    </main>
</div>

<style>

	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

	:global(body) {
    margin: 0;
	font-family: 'Inter', sans-serif;
}

	.app_container {
        display: flex;
        flex-direction: column;
		background-color: rgb(255, 209, 180); 
		min-width: 100%;
		min-height: 100vh;
		justify-content: flex-start;
		gap: 0px;
		
    }

</style>



