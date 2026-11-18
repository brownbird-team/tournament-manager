<script lang="ts">
    import logo from '#lib/assets/logoTemporary.svg';
    let searchOrg = $state('');
</script>

<svelte:head>
    <link rel="icon" href={logo} />
</svelte:head>

<header class="top_bar">
    <p>BrownBird Tournament Manager</p>
    <div class="search_container">
        <input type="text" placeholder="Search organizations..." bind:value={searchOrg} />
        <button onclick={() => console.log(searchOrg)}>
            Search
        </button>
    </div>
    <a href="/" class="logo">
        <img src={logo} alt="Logo" />
    </a>
</header>

<style>

.top_bar{
		align-self: center;
		background-color: #3f382d;
		min-height: 6vh;
		display: flex;
        flex-direction: row;
		justify-content: space-between;
		align-items: center;
		min-width: 98%;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
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

.search_container {
    display: flex;
    align-items: center;
    width: 35%;
    height: 80%;
    background-color: rgba(255, 255, 255, 0);
    border-radius: 25px;
    overflow: hidden;
   
}

.search_container input {
    flex: 1;
    min-width: 0;
    height: 100%;
    border: rgba(249, 255, 239, 0.621) solid 0.5px;
    outline: none;
    padding: 0 12px;
    border-radius: 25px 0 0 25px;
    background-color: #343f3e00;
    color: white;
}

.search_container button {
    height: 100%;
    padding: 0 15px;
    border-radius: 0 25px 25px 0;
    background-color: #71817D;
    color: rgb(255, 255, 255);
    cursor: pointer;
    border: rgba(249, 255, 239, 0.646) solid 0.5px;
}

.search_container button:hover {
    background-color: #899994;
}

</style>
