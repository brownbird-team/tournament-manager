<script lang="ts">
    import { untrack } from 'svelte';
    import type { PageProps } from './$types';
    import profileOverlay from '#lib/assets/photo.svg';
  import { enhance } from '$app/forms';

    let { data, form }: PageProps = $props();

    let settingsForm =
        $derived(form && form.form === 'settings' ? form : undefined);

    let bio = $derived(settingsForm?.data.bio ?? data.user.desc ?? '');
    let username = $derived(settingsForm?.data.username ?? data.user.username);

    const MAX_BIO_LENGTH = 800;
    const MIN_USERNAME_LENGTH = 4;
    const MAX_USERNAME_LENGTH = 30;

    let files = $state<FileList | undefined>()

    let profileImage =
        $state(untrack(() => data.user.profilePic));

    $effect(() => {
        if (files && files.length > 0) {
            const url = URL.createObjectURL(files[0]);
            profileImage = url;

            return () => {
                URL.revokeObjectURL(url);
            }
        }

        profileImage = data.user.profilePic;
    });
</script>

<form
    action="?/settings"
    method="POST"
    enctype="multipart/form-data"
    class="settings-container"
    use:enhance
>
    <h2>User Settings</h2>

    <div class="profile-section">
        <label class="avatar-upload">
            <img src={profileImage} alt="User profile" />
            <div class="avatar-overlay">
                 <img src={profileOverlay} alt="Change profile pic" />
            </div>

            <input
                name="image"
                type="file"
                bind:files={files}
                accept="image/png,image/jpeg,image/webp"
            />
        </label>

        <p>Change profile picture</p>
        {#if settingsForm?.errors?.image}
            <small>{settingsForm?.errors?.image}</small>
        {/if}
    </div>

    <div class="settings-divider"></div>

    <div class="setting-field">
        <label for="username">Change username</label>
        <input
            name="username"
            type="text"
            bind:value={username}
            placeholder="Enter username"
            minlength={MIN_USERNAME_LENGTH}
            maxlength={MAX_USERNAME_LENGTH}
            required
        />
        <small>{username.length}/{MAX_USERNAME_LENGTH}</small>
        {#if settingsForm?.errors?.username}
            <small>{settingsForm?.errors?.username}</small>
        {/if}
    </div>

    <div class="settings-divider"></div>

    <div class="setting-field">
        <label for="bio">Change bio</label>
        <textarea
            name="bio"
            bind:value={bio}
            placeholder="What are you all about?"
            maxlength={MAX_BIO_LENGTH}
            rows="4"
        ></textarea>
        <small>{bio.length}/{MAX_BIO_LENGTH}</small>
        {#if settingsForm?.errors?.bio}
            <small>{settingsForm?.errors?.bio}</small>
        {/if}
    </div>

    <button class="save-button">
        Save changes
    </button>
</form>

<div class="settings-container">
    <h2>User Connections</h2>

    {#if data.plugins.connected.length > 0}
        <h3>Linked</h3>
        {#each data.plugins.connected as plugin}
            <form action="?/disconnect" method="POST" class="linked-row" use:enhance>
                <p>{plugin.pTitle}</p>
                <input type="hidden" name="plugin" value={plugin.pId}>

                {#if plugin.disconnectable}
                    <button>Unlink</button>
                {/if}
            </form>
        {/each}
    {/if}

    {#if data.plugins.connected.length > 0 && data.plugins.disconnected.length > 0}
        <div class="settings-divider"></div>
    {/if}

    {#if data.plugins.disconnected.length > 0}
        <h3>Unlinked</h3>
        {#each data.plugins.disconnected as plugin}
            <div class="unlinked-row">
                <p>{plugin.pTitle}</p>
                <a href={plugin.loginUrl}>Link</a>
            </div>
        {/each}
    {/if}
</div>

<style>
    .linked-row {
        display: flex;
        background-color: var(--color-bg);
        margin-top: 1rem;
        padding: 0rem 1rem;
        border: 1px solid var(--color-border);
        border-radius: 0.5rem;
        justify-content: space-between;
        color: var(--color-text);
    }

    .linked-row button {
        padding: 0;
        background-color: transparent;
        border: none;
        cursor: pointer;
        color: var(--color-text);
        font-size: 0.9rem;
    }

    .unlinked-row {
        display: flex;
        background-color: var(--color-bg);
        margin-top: 1rem;
        padding: 0rem 1rem;
        border: 1px solid var(--color-border);
        border-radius: 0.5rem;
        justify-content: space-between;
        color: var(--color-text);
        align-items: center;
    }

    .unlinked-row a {
        
        padding: 0;
        background-color: transparent;
        border: none;
        cursor: pointer;
        color: var(--color-text);
        text-decoration: none;
        font-size: 0.9rem;
    }

    .settings-container {
        width: 500px;
        max-width: 90%;
        margin: 40px auto;
        padding: 30px;
        background-color: var(--color-framebg);
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        border: var(--color-border) 2px solid;
    }

    h2 {
        text-align: center;
        margin: 0 0 30px 0;
        font-size: 24px;
    }

    .profile-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        margin-bottom: 25px;
    }

    .avatar-upload {
        position: relative;
        width: 130px;
        height: 130px;
        border-radius: 50%;
        cursor: pointer;
        overflow: hidden;
        border: rgb(184, 159, 159) 2px solid;
    }

    .avatar-upload img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }

    .avatar-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.55);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.2s ease;
    }

    .avatar-overlay img {
        width: 35px;
        height: 35px;
    }

    .avatar-upload:hover .avatar-overlay {
        opacity: 1;
    }

    .avatar-upload input {
        display: none;
    }

    .profile-section p {
        font-size: 13px;
    }

    .settings-divider {
        height: 1px;
        width: 100%;
        background-color: var(--color-border);
        margin: 25px 0;
    }

    .setting-field {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .setting-field label {
        font-weight: 600;
        font-size: 15px;
    }

    .setting-field input,
    .setting-field textarea {
        background-color: var(--color-bg);
        color: var(--color-text);
        border: 1px solid var(--color-border);
        border-radius: 7px;
        padding: 12px;
        font-family: inherit;
        font-size: 14px;
        outline: none;
        resize: vertical;
        transition: border-color 0.2s ease;
    }

    .setting-field input:focus,
    .setting-field textarea:focus {
        border-color: var(--color-framehover);
    }

    .setting-field input::placeholder,
    .setting-field textarea::placeholder {
        color: var(--color-text);
    }

    .save-button {
        display: block;
        margin: 30px 0 0 auto;
        padding: 11px 22px;
        border: none;
        border-radius: 20px;
        background-color: var(--color-buttonbg);
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }

    .save-button:hover {
        background-color: var(--color-framehover);
    }
</style>
