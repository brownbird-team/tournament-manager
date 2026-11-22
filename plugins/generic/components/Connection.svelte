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
        gap: 2rem;
        align-items: center;
        padding: 1rem;
        border: 1px solid white;
    }

    .connection div {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .provider {
        font-size: 0.8rem;
    }

    .user {
        font-size: 1.5rem;
        font-weight: bold;
    }
</style>