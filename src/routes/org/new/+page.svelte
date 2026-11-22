
<script lang="ts">
    import { enhance } from "$app/forms";
    import photoProfile from '#lib/assets/photo.svg';

    let { form } = $props();

    //current name and desc
    let name = $state('');
    let desc = $state('');

    //current profile pic
    let profilePic = $state(photoProfile);

    // new profile pic
    let selectedImage = $state<File | null>(null);

    let errorMessage = $state('');

    const MAX_NAME_LENGTH = 20;
    const MIN_NAME_LENGTH = 3;
    const MAX_DESC_LENGTH = 160;

    let previousImageUrl: string | null = null;

    async function changeProfileImage(event: Event) {
        const input = event.currentTarget as HTMLInputElement;
        const file = input.files?.[0];

        if (!file) return;

        errorMessage = '';

        // Provjera formata
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

        if (!allowedTypes.includes(file.type)) {
            errorMessage = 'Please use a PNG, JPEG or WEBP picture format';
            input.value = '';
            return;
        }

        // new pic showcase
        if (previousImageUrl) {
            URL.revokeObjectURL(previousImageUrl);
        }

        previousImageUrl = URL.createObjectURL(file);

        profilePic = previousImageUrl;
        selectedImage = file;        
    }
</script>

<div class="org_container">
    <h2>Create organization</h2>
    <form class="data_container" method="POST" enctype="multipart/form-data" use:enhance>
        <span class="left">
            <div class="profile_section">
                <label class="avatar_upload">
                    <img src={profilePic} alt="User profile" />
                    <div class="avatar_overlay">
                        <img src={photoProfile} alt="Change profile pic" />
                    </div>

                    <input
                        name="profilePic"
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onchange={changeProfileImage}
                    />
                </label>

                <p>Change profile picture</p>
            </div>
        </span>
        <span class="right">
            <div class="setting_field">
                <label for="name">Organization name</label>
                <input
                    id="name"
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

            <div class="settings_divider"></div>

            <div class="setting_field">
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
                <p class="error_message">{errorMessage || form.error}</p>
            {/if}

            {#if form?.success}
                <p class="success_message">{form.message}</p>
            {/if}

            <button class="create_button" type="submit">
                Create
            </button>
        </span> 
    </form>
</div>

<style>
    .data_container {
        display: flex;
        flex-direction: row;
    }
    .left {
        width: 35%;
    }
    .right {
        width: 65%;
    }
    .org_container {
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

    .profile_section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        margin-bottom: 25px;
    }

    .avatar_upload {
        position: relative;
        width: 130px;
        height: 130px;
        border-radius: 50%;
        cursor: pointer;
        overflow: hidden;
        border: rgb(184, 159, 159) 2px solid;
    }

    .avatar_upload img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }

    .avatar_overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.55);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.2s ease;
    }

    .avatar_overlay img {
        width: 35px;
        height: 35px;
    }

    .avatar_upload:hover .avatar_overlay {
        opacity: 1;
    }

    .avatar_upload input {
        display: none;
    }

    .profile_section p {
        font-size: 13px;
    }

    .settings_divider {
        height: 1px;
        width: 100%;
        background-color: var(--color-border);
        margin: 25px 0;
    }

    .setting_field {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .setting_field label {
        font-weight: 600;
        font-size: 15px;
    }

    .setting_field input,
    .setting_field textarea {
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

    .setting_field input:focus,
    .setting_field textarea:focus {
        border-color: var(--color-framehover);
    }

    .setting_field input::placeholder,
    .setting_field textarea::placeholder {
        color: var(--color-text);
    }

    .create_button {
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

    .create_button:hover {
        background-color: var(--color-framehover);
    }
</style>
