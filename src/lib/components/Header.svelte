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
    margin-left: 10px;
    color: aliceblue;
}


</style>
