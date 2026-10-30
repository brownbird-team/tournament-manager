<script lang="ts">
	import "./layout.css"
	import favicon from '#lib/assets/favicon.svg';
	import Navbar from "#lib/components/Navbar.svelte";
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />

{@render children()}
