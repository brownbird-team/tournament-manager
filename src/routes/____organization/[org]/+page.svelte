<script>
    import gen from '#lib/assets/genshin.png';
    import val from '#lib/assets/val_icon.jpg';
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

    <div class = "back_btn"> 
            <div>
                Genshin Impact
            </div>
        <a href="/organization"> See all organizations</a>    
    </div>

    <div class = "org_cntr">
        <div class = "imgNname">
            <div class = "img_cntr">
            <img src={gen} alt="Organization pic">
            </div>
            <div class = "name">
                <p>
                    Genshin Impact
                </p>

            <div class = "veri_games">
                <div class="linked_services">
                <p>Supported verification</p>
            <div class="linkedServicesList">
                <p>Discord</p>
                <p>tetr.io</p>
                <p>Epic Games</p>
            </div>
            </div>

            <div class="linked_services">
                <p>Supported Games</p>
            <div class="linkedServicesList">
                <p>Tetris</p>
                <p>Genshin</p>
                <p>Valorant</p>
            </div>
            </div>
            </div>
            

            </div>
        </div>
        <div class = "tournaments">
            <div class = "upcoming_tour">
                
                    <p>Upcoming tournaments...</p>
                
                <hr>
                <div class = "tour_entries">
                <a href="/organization"> </a>
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
                <a href="/organization"> </a>  
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
                <a href="/organization"> </a>  
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
                <a href="/organization"> </a>  
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
        <div class = "desc">
            <p>
                Genshin Impact is an open-world action RPG developed and published by HoYoverse for the PC, iOS/Android, PS5, and Xbox Series X|S platforms.
The game is free-to-play with a gacha monetization system in the form of Wishes.
This wiki is an English resource for information about the global version of the game. There are unmarked spoilers on this wiki.
This wiki currently has 42,270 articles and 346,597 files.

Please read the Community Page and Rules before editing and discussing! 
            </p>
        </div>
    </div>

    
</div>


<style>



/* DESCRIPTION */
.desc  {
    margin-top: 12px;
    display: flex;
    font-family:Arial, Helvetica, sans-serif;
    margin-bottom: 0.8rem;
    background-color: #343f3ea7;
    border: 1px #343f3eb1 solid;
    border-radius: 7px;
    padding: 1rem;
    min-width: 15rem;
    justify-content: center;
    align-self: center;
    justify-self: center;
    
}

/* TOURNAMENTS */

.tournaments hr {
    grid-column: 1 / -1;
    width: 100%;
    border: 0;
    border-top: 1px solid #000000;
    margin: 0.5rem 0 1rem;
}

.tour_entries {
    display: flex;
    flex-direction: row;
    border: 1px #343f3eb1 solid;
    position: relative;
    border-radius: 7px;
    padding: 0.5rem;
    background-color: rgba(74, 93, 84, 0.72);
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
    text-decoration: none; /* No underlines on the link */
    z-index: 10; /* Places the link above everything else in the div */
    background-color: #FFF; /* Fix to make div clickable in IE */
    opacity: 0; /* Fix to make div clickable in IE */
    filter: alpha(opacity=1); /* Fix to make div clickable in IE */
}

.tour_entries > .img_cntr > img{
    max-width: 2.5em;
    max-height: 2.5em;
    display: flex;
    align-self: center;
}

.tour_entries:hover {
    transform: translateY(-4px);
    background-color: rgba(61, 69, 65, 0.686);
    box-shadow: 0 5px 12px rgba(73, 51, 38, 0.15);
}

.tour_name{
    font-size: 1.2rem;
}

.win_timer{
    display: flex;
    align-self: flex-end;
    font-size: 0.9rem;
    padding-left: 3em;
}
.ended_tour > p {
    font-size: 1.5rem;
    font-weight: 800;
    margin: 0 0 0.2rem;
    overflow-wrap: anywhere;
    text-align: center;
}

.upcoming_tour > p {
    font-size: 1.5rem;
    font-weight: 800;
    margin: 0 0 0.2rem;
    overflow-wrap: anywhere;
    text-align: center;
}


.tournaments{
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-start;
    padding: 3em;
    gap: 2rem;
    
}


.upcoming_tour{
    display: flex;
    flex-flow: column wrap;
    align-self: flex-start;
    background-color: #343f3ea7;
    border: 1px #343f3eb1 solid;
    border-radius: 7px;
    padding: 1rem;
    min-width: 15rem;
    gap: 0.5em;

}

.ended_tour{
    display: flex;
    flex-flow: column wrap;
    align-self: flex-start;
    background-color: #343f3ea7;
    border: 1px 343F3E solid;
    border-radius: 7px;
    padding: 1rem;
    min-width: 15rem;
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

.veri_games{
    display: flex;
    gap: 2em;
}



.linkedServicesList p {
    margin: 0;
    padding: 0.15rem 0.5rem;
    border-radius: 6px;
    background-color: #343F3E;
    color: rgb(204, 211, 217);
    font-weight: 700;
    font-size: 0.9rem;
    border: rgb(37, 56, 44) solid 1px;
    align-content: center;
}


/* MISC */
/* a{
    text-decoration: none;
} */

.name{
    display: flex;
    flex-flow: column;
    flex-grow: 1;
    align-content: center;
    justify-self: center;
    /* padding-left: 2em; */
    /* background-color: #343f3e9a;
    border: 1px rgba(0, 0, 0, 0.376) solid;
    border-radius: 7px; */
}

.name > p{
    
    font-size: 2em;
    font-weight: 700;
    justify-content: center;
}

a:visited{
    color: black;
}

.imgNname{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-content: center;
    gap: 2em;
}
.org_cntr{
    margin-left: 4em;
    margin-right: 4em;
    padding-top: 2em;
    display: flex;
    flex-direction: column;
    align-content: center;
    
}

/* SLIKA */
.img_cntr{
    display: flex;
    align-self: flex-start;

    
}

.img_cntr > img{
    max-width: 15em;
    max-height: 15em;
    object-fit: cover;
    
    
}

/* HEADER */
.back_btn{
    background-color: rgb(195, 204, 212);
    padding: 3px;
    display: flex;
    flex-direction: row;
	justify-content: space-between;
	
    
}
.back_btn > a{
    margin-right: 10px;
    align-self: flex-end;
    display: flex;
    
}

.back_btn > div{
    margin-left: 10px;
    align-self: flex-end;
    display: flex;
    
}

@media (max-width:420px){

.tournaments{
    flex-direction: column;
    gap: 1rem;
    padding-top: 1em;
    padding-bottom: 1.5em;
    justify-items: center;
    align-content: center;
}

.org_cntr{
    margin-left: 4em;
    margin-right: 4em;
    padding-top: 2em;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-items: center;
    
}

.win_timer{
    align-self: flex-end;
    justify-self: flex-end;
}

.desc{
    min-width: 18rem;
    max-width: 18rem;
}
.veri_games{
    display: flex;
    gap: 1em;
    flex-direction: column;
}

.img_cntr{
    padding: 0.1em;
}
.img_cntr > img{
    max-width: 10em;
    max-height: 10em;
    object-fit: cover;
    
    
}
.imgNname{
    gap: 0em;
}
.name{
    gap: 0em;
}

.name > p{
  margin-top: 20px;
  margin-bottom: 20px;
}

.upcoming_tour{
    min-width: 18rem;
    max-width: 18rem;
}

.ended_tour{
    min-width: 18rem;
    max-width: 18rem;
}

}

@media (min-width:1400px){

.imgNname{
    grid-area: imgNname;

}

.tournaments{
    grid-area: tournaments;
    justify-content: center;
    align-items: center;

}


.desc{
    grid-area: desc;
    display: flex;
    align-items: stretch;
    height: 100%;
    margin-top: 123px;

}

.org_cntr{
    display: grid;
    grid-template-areas: 
    "imgNname desc"
    "tournaments desc";
    grid-template-columns: 2fr 1.5fr;
    height: 100%;

}
}

</style>