<script lang="ts">
    import logo from '#lib/assets/logoTemporary.svg';
    import themeLight from '#lib/assets/themeLight.png';
    import themeDark from '#lib/assets/themeDark.png';
    let searchOrg = $state('');
    let isThemeLight = $state(false);
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
    <div>
        <button class="theme" onclick={() => {isThemeLight = !isThemeLight; document.documentElement.setAttribute('data-theme', isThemeLight ? 'light' : 'dark')}}>
            <img src={isThemeLight ? themeLight : themeDark} alt="Theme" />
        </button>
        <a href="/" class="logo">
            <img src={logo} alt="Logo" />
        </a>
    </div>
</header>

<style>

.top_bar{
		align-self: center;
		background-color: var(--color-header);
		min-height: 75px;
		display: flex;
        flex-direction: row;
		justify-content: space-between;
		align-items: center;
		min-width: 98%;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
	}

.logo{
    margin-left: 5px;
    margin-right: 10px;
    max-width: 30px;
    max-height: 30px;
}

.theme {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    margin-left: 5px;
    margin-right: 5px;
    max-width: 30px;
    max-height: 30px;
}

.theme > img {
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
    color: var(--color-text);
}

.search_container {
    display: flex;
    align-items: center;
    width: 35%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0);
    border-radius: 15px;
    overflow: hidden;
   
}

.search_container input {
    flex: 1;
    min-width: 0;
    height: 100%;
    border: var(--color-border) solid 0.5px;
    outline: none;
    padding: 12px 12px 12px 12px;
    border-radius: 15px 0 0 15px;
    background-color: transparent;
    color: var(--color-text);
}

.search_container button {
    height: 100%;
    padding: 12px 12px 12px 12px;
    border-radius: 0 15px 15px 0;
    background-color: var(--color-headerbutton);
    color: var(--color-text);
    cursor: pointer;
    border: var(--color-border) solid 0.5px;
    transition: background-color 0.2s ease;
}

.search_container button:hover {
    background-color: var(--color-framehover);
}

</style>
