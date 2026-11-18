<script lang="ts">
    import logo from '#lib/assets/logoTemporary.svg';
</script>

<svelte:head>
    <link rel="icon" href={logo} />
</svelte:head>

<header class="top_bar">
    <p>BrownBird Tournament Manager</p>
    <a href="/" class="logo">
        <img src={logo} alt="Logo" />
    </a>
</header>

<style>

.top_bar{
		align-self: center;
		background-color: #343F3E;
		height: 6vh;
		display: flex;
        flex-direction: row;
		justify-content: space-between;
		align-items: center;
		min-width: 98%;
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
    font-weight: 800;
    margin-left: 10px;
    color: rgb(227, 234, 240);
}

/* ctrlz na kraju do početka da Jaran ne bude ljuta*/
</style>
