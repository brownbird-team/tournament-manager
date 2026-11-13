
<script>
    import settings from '#lib/assets/settingsButton.svg';
</script>

<div class="user_container">
    <div class="user_info_container">
        <div class="profile_picture"><img src="" alt=""></div>
        <div class="user_info">
            <div class="name_settings">
                <p>Username</p>
                <a href="/me/settings"><img src={settings} alt="settings button icon"></a>
            </div>
            <div class="desc"><p>I am a sandwitch</p></div>
            <div class="linked_devices">
                <p>hmmm</p>
            </div>
        </div>
    </div>
    <div class="list_organizations"></div>
</div>


<style>
    .user_container{
        background-color: rgb(255, 209, 180);
        display: flex;
    }
</style>