
<script lang="ts">
    import { goto } from '$app/navigation';
    import type { UserData } from '../../../lib/types';
    import photoProfile from '#lib/assets/photo.svg';
    let { data }: { data: { userData: UserData } } = $props();
    let userData = $derived(data.userData)

    //current username and desc
    let username = $derived(userData.username);
    let bio = $derived(userData.desc ?? '');

    //current profile pic
    let profilePic = $derived(userData.profilePic);

    // new profile pic
    let selectedImage = $derived<File | null>(null);

    let errorMessage = $derived('');

    const MAX_USERNAME_LENGTH = 20;
    const MIN_USERNAME_LENGTH = 3;
    const MAX_BIO_LENGTH = 160;

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

    async function saveSettings() {
        errorMessage = '';

        const cleanUsername = username.trim();

        if (cleanUsername.length < MIN_USERNAME_LENGTH || cleanUsername.length > MAX_USERNAME_LENGTH) {
            errorMessage = 'Username has to be between 3 and 20 characters';
            return;
        }

        if (bio.length > MAX_BIO_LENGTH) {
            errorMessage = 'Please limit your thoughts to only 160 characters';
            return;
        }

        // ROKOOO TU TREBAM SLAT SERVEZRZZZZ

        await goto('/me');
    }
</script>

<div class="settings_container">
    <h2>User Settings</h2>
    <div class="profile_section">
        <label class="avatar_upload">
            <img src={profilePic} alt="User profile" />
            <div class="avatar_overlay">
                 <img src={photoProfile} alt="Change profile pic" />
            </div>

            <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onchange={changeProfileImage}
            />
        </label>

        <p>Change profile picture</p>
    </div>

    <div class="settings_divider"></div>

    <div class="setting_field">
        <label for="username">Change username</label>
        <input
            id="username"
            type="text"
            bind:value={username}
            placeholder="Enter username"
            minlength="3"
            maxlength="20"
            required
        />
        <small>{username.length}/20</small>
    </div>

    <div class="settings_divider"></div>

    <div class="setting_field">
        <label for="bio">Change bio</label>
        <textarea
            id="bio"
            bind:value={bio}
            placeholder="What are you all about?"
            maxlength="160"
            rows="4"
        ></textarea>
        <small>{bio.length}/160</small>
    </div>

    {#if errorMessage}
        <p class="error_message">{errorMessage}</p>
    {/if}

    <button class="save_button" onclick={saveSettings}>
        Save changes
    </button>
</div>

<style>
    .settings_container {
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

    .save_button {
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

    .save_button:hover {
        background-color: var(--color-framehover);
    }
</style>
