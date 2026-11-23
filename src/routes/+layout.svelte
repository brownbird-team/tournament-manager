<script lang="ts">

	import Header from '#lib/components/Header.svelte';
	import "#lib/components/layout.css"
	import type { LayoutProps } from './$types';
	import logo from '#lib/assets/logo.png'
	let { children, data }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={logo} />
	<title>{data.appName}</title>
</svelte:head>

<div class="app_container">
	<main>
		<Header username={data.username} appName={data.appName} />
        {@render children()}
    </main>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

	:global(body) {
		margin: 0;
		font-family: 'Inter', sans-serif;
		background-color: (--color-bg);
	}

	.app_container {
        display: flex;
        flex-direction: column;
		background-color: var(--color-bg); 
		min-width: 100%;
		min-height: 100vh;
		justify-content: flex-start;
		gap: 0px;
		
    }
</style>



