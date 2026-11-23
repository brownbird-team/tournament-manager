<script lang="ts">
    import padlock from '../assets/padlock.svg';

    interface Props {
        providerName: string;
        loginUrl: string;
    }

    const { providerName, loginUrl }: Props = $props();
</script>

<a class="login-button" href={loginUrl}>
    <img src={padlock} alt="AUTH">
    <span>{providerName}</span>
</a>

<style>
    .login-button {
        display: flex;
        gap: 1rem;
        align-items: center;
        padding: 0.5rem;
        background-color: var(--color-framebg);
        border-radius: 0.5rem;
        border: 2px solid var(--color-border);
        color: var(--color-text);
        text-decoration: none;
    }

    .login-button:hover {
        background-color: var(--color-framehover);
    }

    .login-button img {
        height: 2.5rem;
    }
</style>