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
        gap: 2rem;
    }
</style>