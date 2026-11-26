
<script lang="ts">
    import type { PageProps } from './$types';
    import { enhance } from "$app/forms";
    import { untrack } from 'svelte';
    import photoProfile from '#lib/assets/photo.svg';
    import placeholderImage from '#lib/assets/logoTemporary.svg';

    let { form }: PageProps = $props();

    //current name and desc
    let name = $state('');
    let desc = $state('');
    let slug = $state('');

    let errorMessage = $state('');

    const MAX_NAME_LENGTH = 30;
    const MIN_NAME_LENGTH = 4;
    const MAX_DESC_LENGTH = 160;

    let files = $state<FileList | undefined>()

    let profileImage = $state(undefined);

    $effect(() => {
        if (files && files.length > 0) {
            const url = URL.createObjectURL(files[0]);
            profileImage = url;

            return () => {
                URL.revokeObjectURL(url);
            }
        }

        profileImage = undefined;
    });

    let showedImage = $derived(profileImage ?? placeholderImage);
</script>

<div class="org-container">
    <h2>Create organization</h2>
    {JSON.stringify(form?.errors)}
    <form class="data-container" method="POST" enctype="multipart/form-data" use:enhance>
        <span class="left">
            <div class="profile-section">
                <label class="avatar-upload">
                    <img src={showedImage} alt="User profile" />
                    <div class="avatar-overlay">
                        <img src={photoProfile} alt="Change profile pic" />
                    </div>

                    <input
                        name="image"
                        type="file"
                        bind:files={files}
                        accept="image/png,image/jpeg,image/webp"
                    />
                </label>

                <p>Change profile picture</p>
            </div>
        </span>
        <span class="right">
            <div class="setting-field">
                <label for="name">Organization name</label>
                <input
                    name="name"
                    type="text"
                    bind:value={name}
                    placeholder="Enter name"
                    minlength={MIN_NAME_LENGTH}
                    maxlength={MAX_NAME_LENGTH}
                    required
                />
                <small>{name.length}/{MAX_NAME_LENGTH}</small>
            </div>

            <div class="settings-divider"></div>

            <div class="setting-field">
                <label for="slug">URL slug</label>
                <input
                    name="slug"
                    type="text"
                    bind:value={slug}
                    placeholder="Enter slug"
                    minlength={MIN_NAME_LENGTH}
                    maxlength={MAX_NAME_LENGTH}
                    required
                />
                <small>{slug.length}/{MAX_NAME_LENGTH}</small>
            </div>

            <div class="settings-divider"></div>

            <div class="setting-field">
                <label for="description">Change description</label>
                <textarea
                    id="description"
                    name="description"
                    bind:value={desc}
                    placeholder="Enter description"
                    maxlength={MAX_DESC_LENGTH}
                    rows="4"
                ></textarea>
                <small>{desc.length}/{MAX_DESC_LENGTH}</small>
            </div>

            {#if errorMessage || form?.error}
                <p class="error-message">{errorMessage || form.error}</p>
            {/if}

            {#if form?.success}
                <p class="success-message">{form.message}</p>
            {/if}

            <button class="create-button" type="submit">
                Create
            </button>
        </span> 
    </form>
</div>

<style>
    .data-container {
        display: flex;
        flex-direction: row;
    }
    .left {
        width: 35%;
    }
    .right {
        width: 65%;
    }
    .org-container {
        width: 700px;
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

    .create-button {
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

    .create-button:hover {
        background-color: var(--color-framehover);
    }
</style>
