
<script lang='ts'>
    import settings from '#lib/assets/settingsButton.svg';
    import profilePic from '#lib/assets/profileLogo/squid.png';
</script>

<div class="user_container">
    <div class="user_info_container">
        <div class="profile_picture"><img src={profilePic} alt=""></div>
        <div class="user_info">
            <div class="name_settings">
                <p>LonelyNoodles</p>
                <a href="/me/settings" class="settingsImage"><img src={settings} alt="settings button icon"></a>
            </div>
            <hr>
            
            <div class="desc"><p>I am a sandwitch</p></div>
            <div class="linked_services">
                <p>Linked services</p>
                <div class="linkedServicesList">
                    <p>Discord</p>
                    <p>tetr.io</p>
                    <p>Epic Games</p>
                </div>
            </div>
        </div>
    </div>
    <div class="orgAndTournaments">
        <div class="list_organizations">
            <div class="orgFlex1">
                <p>My organizations</p>
                <a href="/settings">+</a>
                <hr>
            </div>
            <p>Awesome Chess</p>
            <p>Bad Chess</p>
        </div>
        <div class="tournaments">
            <p>Upcoming tournaments</p>
            <hr>
        </div>
    </div>
</div>


<style>
    
/* GENERALNO */
* {
    box-sizing: border-box;
}

.user_container {
    min-height: 100vh;
    width: 100%;
    padding: 1.5rem 2rem;

    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

/* PROFIL */

.user_info_container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
    padding: 1rem;
    background-color: burlywood;
    border-radius: 8px;
}

.profile_picture {
    flex: 0 0 150px;
    width: 150px;
    height: 150px;

    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;
    border-radius: 50%;
    border: 2px rgb(246, 225, 156) solid;
    background-color: brown;
}

.profile_picture img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* INFO O KORISNIKU */

.user_info {
    flex: 1;
    min-width: 0;

    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.name_settings {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
}

.name_settings p {
    font-size: 1.7rem;
    font-weight: 700;
    margin: 0;
    overflow-wrap: anywhere;
}

.settingsImage {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.35rem;
    border-radius: 50%;
    flex-shrink: 0;
    transition: background-color 0.2s;
}

.settingsImage img {
    width: 1.4rem;
    height: 1.4rem;
}

.settingsImage:hover {
    background-color: rgba(0, 0, 0, 0.1);
}

.user_info  hr {
    width: 60%;
    margin: 0.2rem 0;
    border: 0;
    border-top: 1px solid #98583D;
}

.desc p {
    margin: 0rem 0;
    overflow-wrap: anywhere;
    font-family:Arial, Helvetica, sans-serif;
    margin-bottom: 0.8rem;
    
}

/* POVEZANE USLUGE */

.linked_services {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    font-weight: bold;
}
.linked_services > p {
    margin: 0;
}

.linkedServicesList {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
}



.linkedServicesList p {
    margin: 0;
    padding: 0.15rem 0.5rem;
    border-radius: 6px;
    background-color: #b17857;
    font-weight: 700;
    font-size: 0.9rem;
    border: rgb(255, 228, 171) solid 1px;
}

/* ORGANIZACIJE I TURNIRI */

.orgAndTournaments {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
    width: 100%;
    align-items: stretch;
}

/* ORGANIZACIJE */

.list_organizations {
    background-color: rgba(232, 184, 116, 0.428);
    border: 1px rgb(255, 211, 168) solid;
    border-radius: 7px;
    padding: 1rem;
    min-height: 220px;
    min-width: 0;
    transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
}

.orgFlex1 {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.5rem;
}

.orgFlex1 p {
    font-size: 1.8rem;
    font-weight: 800;
    margin: 0;
    overflow-wrap: anywhere;
}

.orgFlex1 a {
    font-size: 2rem;
    font-weight: 800;
    text-decoration: none;
    color: #9c4a2c;
}

.orgFlex1 a:hover {
    opacity: 0.7;
}

.orgAndTournaments hr {
    grid-column: 1 / -1;
    width: 100%;
    border: 0;
    border-top: 1px solid #000000;
    margin: 0.5rem 0 1rem;
}

.list_organizations > p {
    margin: 0.8rem 0;
    padding-left: 0.2rem;
    text-decoration: underline;
    overflow-wrap: anywhere;
}

/* TURNIRI */

.tournaments {
    background-color: rgba(232, 184, 116, 0.428);
    border: 1px rgb(255, 211, 168) solid;
    border-radius: 7px;
    padding: 1rem;
    min-width: 0;

    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease; 
}

.tournaments > p {
    font-size: 1.8rem;
    font-weight: 800;
    margin: 0 0 0.2rem;
    overflow-wrap: anywhere;
    text-align: center;
}

.list_organizations:hover,
.tournaments:hover {
    transform: translateY(-4px);
    background-color: #f2c898;
    box-shadow: 0 5px 12px rgba(73, 51, 38, 0.15);
}

/* PRILAGODBA MANJIM EKRANIMA */

@media (max-width: 700px) {
    .user_container {
        padding: 1rem;
    }

    .user_info_container {
        align-items: flex-start;
        gap: 1rem;
    }

    .profile_picture {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
    }

    .name_settings p {
        font-size: 1.3rem;
    }

    .orgAndTournaments {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
}

@media (max-width: 420px) {
    .user_info_container {
        flex-direction: column;
    }

    .profile_picture {
        align-self: center;
    }
}


</style>