<script lang="ts">
    import padlock from '../assets/padlock.svg';

    interface Props {
        userName: string;
        providerName: string;
    };

    const { userName, providerName }: Props = $props();
</script>

<div class="connection">
    <img src={padlock} alt="AUTH">
    <div>
        <span class="provider">{providerName}</span>
        <span class="user">{userName}</span>
    </div>
</div>

<style>
    .connection {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        align-items: center;
        padding: 0.5rem 1rem;
        border: var(--color-border) solid 1px;
        border-radius: 0.8rem;
        background-color: var(--color-bg);
    }

    .connection div {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
    }

    .connection img {
        height: 2rem;
    }

    .provider {
        font-size: 0.8rem;
    }

    .user {
        font-size: 1.1rem;
        font-weight: bold;
    }
</style>