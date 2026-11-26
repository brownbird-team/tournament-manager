<script lang='ts'>
    import type { PageProps } from './$types.ts';
    import gen from '#lib/assets/genshin.png';
    import val from '#lib/assets/val_icon.jpg';
    import { page } from '$app/state';
    import settingsIcon from '#lib/assets/settingsButton.svg';

    let { data }: PageProps = $props()
    let orgData = $derived(data.organisationData);
</script>


<!-- ime organizacije
    profilnu organizacije
    opis organizacije
    turniri
        nadolazeći
        prošli

    Autentificiran (owner organizacije)

    isto kao Anonimni i Autetificirani
    tipka: kreiraj turnir
    tipka: settings
    nepublishani turniri

 -->


<div class = "org_site_cntr">
    <div class = "org_cntr">
        <div class = "imgNname">
            <div class = "img_cntr">
                <img src={orgData.orgPic} alt="Organization pic">
            </div>
            <div class = "name">
                <p>
                    <span>{orgData.name}</span>
                    {#if data.userIsOwner}
                        <a class="settings" href={data.organisationData.settingsUrl}>
                            <img src={settingsIcon} />
                        </a>
                    {/if}
                </p>
            </div>
        </div>

        {#if orgData.desc}
            <div class = "desc">
                <p>
                    {orgData.desc}
                </p>
            </div>
        {/if}

        <div class = "tournaments">
            <div class = "upcoming_tour">
                
                    <p>Upcoming tournaments...</p>
                
                <hr>
                <div class = "tour_entries">
                <a href={page.url.pathname}> </a>
                    <div class = "img_cntr">
                        <img src={val} alt="tournament icon">
                    </div>
                    <div class = "tour_name">
                        Fertrisss
                    </div>
                    <div class = "win_timer">
                        Start in: 21:00:01
                    </div>
                </div>
            </div>

            <div class = "ended_tour">
                 
                <p>Finished tournaments</p>
                <hr>
                <div class = "tour_entries">
                <a href={page.url.pathname}> </a>  
                    <div class = "img_cntr">
                        <img src={val} alt="tournament icon">
                    </div>
                    <div class = "tour_name">
                        Valorant champions
                    </div>
                    <div class = "win_timer">
                        Winner: dor_
                    </div>
                    
                </div>
                <div class = "tour_entries">
                <a href={page.url.pathname}> </a>  
                    <div class = "img_cntr">
                        <img src={val} alt="tournament icon">
                    </div>
                    <div class = "tour_name">
                        Valorant champions
                    </div>
                    <div class = "win_timer">
                        Winner: dor_
                    </div>
                    
                </div>
                <div class = "tour_entries">
                <a href={page.url.pathname}> </a>  
                    <div class = "img_cntr">
                        <img src={val} alt="tournament icon">
                    </div>
                    <div class = "tour_name">
                        Valorant champions
                    </div>
                    <div class = "win_timer">
                        Winner: dor_
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<style>

.settings img {
    height: 2rem;
}

.settings {
    height: 2rem;
    display: flex;
    align-items: center;
}

.name p {
    display: flex;
    align-items: center;
    gap: 1rem;
}

/* DESCRIPTION */
.desc {
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    font-family: Arial, Helvetica, sans-serif;
    background-color: var(--color-framebghalf);
    border: 1px solid var(--color-border);
    color: var(--color-text);
    border-radius: 7px;
    padding: 1rem 1.25rem;
    width: 100%;
    max-width: 54rem;
    box-sizing: border-box;
    justify-content: center;
    align-self: center;
    text-align: left;
}

.desc > p {
    margin: 0;
}

/* TOURNAMENTS */

.tournaments hr {
    grid-column: 1 / -1;
    width: 100%;
    border: 0;
    border-top: 1px solid var(--color-border);
    margin: 0.5rem 0 1rem;
}

.tour_entries {
    display: flex;
    flex-direction: row;
    border: 1px solid var(--color-border);
    position: relative;
    border-radius: 7px;
    padding: 0.5rem;
    background-color: var(--color-framebg);
    color: var(--color-text);
    gap: 0.8rem;
    justify-content: stretch;
    align-items: center;
    transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease; 
}


.tour_entries > a {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    text-decoration: none;
    z-index: 10;
    background-color: var(--color-bg);
    opacity: 0;
    filter: alpha(opacity=1);
}

.tour_entries > .img_cntr > img {
    max-width: 2.5em;
    max-height: 2.5em;
    display: flex;
    align-self: center;
}

.tour_entries:hover {
    transform: translateY(-4px);
    background-color: var(--color-framehover);
    box-shadow: 0 5px 12px var(--color-bg);
}

.tour_name {
    font-size: 1.2rem;
}

.win_timer {
    display: flex;
    align-self: flex-end;
    font-size: 0.9rem;
    margin-left: auto;
    padding-left: 1em;
}

.ended_tour > p,
.upcoming_tour > p {
    font-size: 1.5rem;
    font-weight: 800;
    margin: 0 0 0.2rem;
    overflow-wrap: anywhere;
    text-align: center;
}

.tournaments {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: center;
    padding: 1.5rem 0 3rem;
    gap: 2rem;
    width: 100%;
    max-width: 54rem;
}

.upcoming_tour,
.ended_tour {
    display: flex;
    flex-direction: column;
    background-color: var(--color-framebghalf);
    border: 1px solid var(--color-border);
    color: var(--color-text);
    border-radius: 7px;
    padding: 1rem;
    flex: 1 1 18rem;
    max-width: 26rem;
    width: 100%;
    box-sizing: border-box;
    gap: 0.5em;
}


/* LINKED SERVICES */
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

.veri_games {
    display: flex;
    gap: 2em;
}

.linkedServicesList p {
    margin: 0;
    padding: 0.15rem 0.5rem;
    border-radius: 6px;
    background-color: var(--color-framebg);
    color: var(--color-text);
    font-weight: 700;
    font-size: 0.9rem;
    border: 1px solid var(--color-border);
    align-content: center;
}


/* MISC */
.name {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.name > p {
    font-size: clamp(1.5rem, 4vw, 2.2rem);
    font-weight: 700;
    margin: 0.75rem 0;
    color: var(--color-text);
}

a:visited {
    color: var(--color-text);
}

.imgNname {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.org_cntr {
    margin-inline: clamp(1rem, 5vw, 4rem);
    padding-top: 2em;
    padding-bottom: 4em;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--color-text);
}

/* SLIKA */
.img_cntr {
    display: flex;
    justify-content: center;
    align-items: center;
}

.imgNname > .img_cntr > img {
    width: clamp(8rem, 25vw, 13rem);
    height: clamp(8rem, 25vw, 13rem);
    border-radius: 50%;
    border: 2px solid var(--color-border);
    object-fit: cover;
}

/* HEADER */
.back_btn {
    background-color: var(--color-header);
    padding: 3px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.back_btn > a {
    margin-right: 10px;
    align-self: flex-end;
    display: flex;
}
.back_btn > div {
    margin-left: 10px;
    align-self: flex-end;
    display: flex;
}

@media (max-width: 680px) {
    .tournaments {
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
    }

    .upcoming_tour,
    .ended_tour {
        flex: none;
        width: 100%;
        max-width: 100%;
    }

    .veri_games {
        flex-direction: column;
        gap: 1em;
    }
}

</style>