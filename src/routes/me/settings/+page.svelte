
<script lang="ts">
    import profilePic from '#lib/assets/profileLogo/squid.png';
    let username = $state('BrownBirdUser');
    let bio = $state('Tell us something about yourself...');

    function changeProfileImage(event: Event) {
        const file = (event.currentTarget as HTMLInputElement).files?.[0];
    }

    function saveSettings() {
        console.log({
            username,
            bio,
            profilePic
        });
    }
</script>

<div class="settings_container">
    <h2>User Settings</h2>
    <div class="profile_section">
        <label class="avatar_upload">
            <img src={profilePic} alt="Profile picture" />

            <div class="avatar_overlay">
                <svg viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 5h-4L8 8H4v11h16V8h-4z" />
                    <circle cx="12" cy="13" r="3" />
                </svg>
            </div>

            <input
                type="file"
                accept="image/*"
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
        />
    </div>

    <div class="settings_divider"></div>

    <div class="setting_field">
        <label for="bio">Change bio</label>
        <textarea
            id="bio"
            bind:value={bio}
            placeholder="What are you all about?"
            rows="4"
        ></textarea>
    </div>

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
        background-color: #343F3E;
        border-radius: 12px;
        color: rgb(227, 234, 240);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        border: rgba(255, 255, 255, 0.274) 2px solid;
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

    .avatar_overlay svg {
        width: 35px;
        height: 35px;
        color: white;
    }

    .avatar_upload:hover .avatar_overlay {
        opacity: 1;
    }

    .avatar_upload input {
        display: none;
    }

    .profile_section p {
        font-size: 13px;
        color: #aab8b5;
    }

    .settings_divider {
        height: 1px;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.15);
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
        background-color: #293332;
        color: white;
        border: 1px solid #53615e;
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
        border-color: #899994;
    }

    .setting_field input::placeholder,
    .setting_field textarea::placeholder {
        color: #899994;
    }

    .save_button {
        display: block;
        margin: 30px 0 0 auto;
        padding: 11px 22px;
        border: none;
        border-radius: 20px;
        background-color: #71817D;
        color: white;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }

    .save_button:hover {
        background-color: #899994;
    }
</style>
