<div id="outer">
    <img id="photo" src="/images/user.png" alt="Profile">
    <div id="username">
        <span id="myusername">Username</span>
        <span id="settings"><a href="/me/settings"><img src="/images/settings.png" alt="Settings"></a></span>
    </div>
    <div id="linked">
        <div id="mylinked">Linked services</div>
        <span id="service">Discord</span>
        <span id="service">tetr.io</span>
        <span id="service">Steam</span>
        <span id="service">Epic Games</span>
    </div>
    <div id="organizations">
        <div id="navorganization">
            <span id="myorganizations">My organizations</span>
            <a href="/organizations/new" id="addorganization"><img src="/images/add.png" alt="Add"></a>
        </div>
        <hr>
        <div><a id="organization" href="/todo">Awesome Chess</a></div>
        <div><a id="organization" href="/todo">Ananas Tournaments</a></div>
    </div>
    <div id="tournaments">
        <div id="upcomingtournaments">Upcoming tournaments</div>
    </div>
</div>

<style>
    #outer {
        color: var(--color-text);
        width: 60%;
        margin-left: auto;
        margin-right: auto;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 100px 100px 80px 80px;
    }
    #photo {
        grid-column: 1 / span 1;
        grid-row: 1 / span 2;

        margin: 10px 10px 10px 10px;
        color: var(--color-text);
        height: 90%;

        border-width: 2px;
        border-color: var(--color-border);
        border-style: solid;
        border-radius: 10px;
    }
    #username {
        grid-column: 2 / span 3;
        grid-row: 1 / span 1;

        display: flex;
        flex-direction: row;
    }
    #myusername {
        font-size: x-large;
        font-weight: bolder;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    #settings {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
    }
    #settings img {
        height: 30px;
    }
    #linked {
        grid-column: 2 / span 3;
        grid-row: 2 / span 1;
    }
    #mylinked {
        margin: 5px 5px 5px 5px;
    }
    #organizations {
        grid-column: 1 / span 2;
        grid-row: 3 / span 2;

        background-color: var(--color-framebg);
        border-color: var(--color-border);
        border-style: solid;

        border-radius: 10px;
        padding: 10px 10px 10px 10px;
        margin: 10px 10px 10px 10px;
    }
    #navorganization {
        height: 20px;
        display: flex;
        flex-direction: row;
    }
    #myorganizations {
        font-size: x-large;
        font-weight: bolder;

        display: flex;
        align-items: center;
        margin-right: auto;
    }
    #addorganization {
        height: inherit;
    }
    #addorganization > img {
        height: inherit;
    }
    #organization {
        color: var(--color-text);
    }
    #organization:visited {
        color: var(--color-text);
    }
    #tournaments {
        grid-column: 3 / span 2;
        grid-row: 3 / span 2;

        padding: 10px 10px 10px 10px;
        margin: 10px 10px 10px 10px;
    }
    #upcomingtournaments {
        font-size: x-large;
        font-weight: bolder;
    }
    #service {
        background-color: var(--color-border);
        border-color: var(--color-buttonbg);
        border-style: solid;
        border-radius: 5px;
        border-width: 1px;

        font-size: smaller;
        font-weight: bolder;

        padding: 2px 2px 2px 2px;
        margin: 2px 2px 2px 2px;
    }
    hr {
        color: var(--color-text);
    }
</style>