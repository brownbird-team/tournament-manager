<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import logo from '#lib/assets/logoTemporary.svg'
	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={logo} />
</svelte:head>

<div class="app_container">
	<header class="top_bar">
		<p>BrownBird Tournament Manager</p>
		<a href="/" class="logo">
			<img src={logo} alt="Logo" />
    	</a>
	</header>
	<main>
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
		background-color: rgba(222, 187, 144, 0); 
		min-width: 100%;
		min-height: 100vh;
		justify-content: flex-start;
		gap: 0px;
		
    }

	.top_bar{
		align-self: center;
		margin-top: 3px;
		margin-left: 3px;
		margin-right: 4px;
		border-radius: 10px;
		border: rgb(255, 203, 47) 2px solid;
		background-color: rgb(153, 100, 79);
		height: 6vh;
		display: flex;
        flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 98%;
	}
	.logo{
		margin-right: 10px;
		max-width: 30px;
		max-height: 30px;
	}

	.logo > img{
		max-width: 30px;
		max-height: 30px;
	}

	.top_bar > p{
		margin-left: 10px;
		color: aliceblue;
	}

</style>



