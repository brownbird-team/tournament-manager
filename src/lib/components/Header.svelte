<script lang="ts">
    interface Props {
        username?: string;
        appName: string;
    }

    import logo from '#lib/assets/logo.png';
    import logout from '#lib/assets/logout.svg';
    import login from '#lib/assets/login.svg';

    import themeDark from '#lib/assets/themeDark.png';
    import themeLight from '#lib/assets/themeLight.png';

    let searchOrg = $state('');
    let isThemeLight = $state(false);

    const { username, appName }: Props = $props();
</script>

<header class="top_bar">
    <a class="identity" href="/">
        <img src={logo} alt="Logo" />
        <h1>{appName}</h1>
    </a>
    <div class="search_container">
        <input type="text" placeholder="Search organizations..." bind:value={searchOrg} />
        <button onclick={() => console.log(searchOrg)}>
            Search
        </button>
    </div>
    <div class="container-right">
        <button class="theme" onclick={() => {isThemeLight = !isThemeLight; document.documentElement.setAttribute('data-theme', isThemeLight ? 'light' : 'dark')}}>
            <img src={isThemeLight ? themeLight : themeDark} alt="Theme" />
        </button>
        {#if username}
            <a class="username" href="/me">{username}</a>
            <form class="logout-form" action="/logout" method="POST">
                <button title="Logout" class="login-logout-button">
                    <img src={logout} alt="Logout">
                </button>
            </form>
        {:else}
            <a href="/login" class="login-logout-button">
                <img src={login} alt="Login">
            </a>
        {/if}
    </div>
</header>

<style>
    .top_bar {
		align-self: center;
		background-color: var(--color-header);
		min-height: 75px;
		display: flex;
        flex-direction: row;
		justify-content: space-between;
		align-items: center;
		min-width: 98%;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
        padding: 0 1rem;
	}

    .identity {
        display: flex;
        align-items: center;
        font-size: 0.6rem;
        color: var(--color-text);
        gap: 1rem;
        text-decoration: none;
    }

    .identity img {
        height: 3rem;
    }

    .login-logout-button {
        background-color: transparent;
        border: none;
        height: 2.5rem;
        display: flex;
        cursor: pointer;
    }

    .container-right {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .username {
        font-weight: bold;
        text-decoration: none;
        color: var(--color-text);
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
