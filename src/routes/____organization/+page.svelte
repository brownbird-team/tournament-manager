<script lang="ts">
    import val from '#lib/assets/val_icon.jpg';
    import gen from '#lib/assets/genshin.png';
</script>

<div class = "org_container">

    <div class = "lista">
        <p>
            Organizations
            </p>
    </div>

    <div class = orgs_container>
        
        <div class = "jedna_org">
        <div class = "img_cntr">
            <a class = "img_link" href="/organization/meow">
                <img src= {val} alt="Slika organizacije" >
            </a>
        </div>

        <div class ="name_desc">
            <div class ="ime">
                <a class = "name" href="/organization/meow"> Val</a>
            <hr class = "linija" color ="black">
            </div>
            <div class = "opis">
                <p>Opis: aaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaaaaaaaaaa aaaaaaRiot games je org koja prvobitno izbacuje dobre pjesme ali ima i okej igre</p>
            </div>
        </div>

        </div>
          <div class = "jedna_org">
        <div class = "img_cntr">
            <a class = "img_link" href="/organization/meow">
                <img src= {gen} alt="Slika organizacije" >
            </a>
        </div>

        <div class ="name_desc">
            <div class ="ime">
                <a class = "name" href="/organization/gen"> Genshin</a>
            <hr class = "linija" color ="black">
            </div>
            <div class = "opis">
                <p>Genshin Impact is an open-world action RPG developed and published by HoYoverse for the PC, iOS/Android, PS5, and Xbox Series X|S platforms.
The game is free-to-play with a gacha monetization system in the form of Wishes.</p>
            </div>
        </div>

        </div>
          <div class = "jedna_org">
        <div class = "img_cntr">
            <a class = "img_link" href="/organization/val">
                <img src= {val} alt="Slika organizacije" >
            </a>
        </div>

        <div class ="name_desc">
            <div class ="ime">
                <a class = "name" href="/organization/meow"> Val2</a>
            <hr class = "linija" color ="black">
            </div>
            <div class = "opis">
                <p>Opis: aaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaaaaaaaaaa aaaaaaRiot games je org koja prvobitno izbacuje dobre pjesme ali ima i okej igre</p>
            </div>
        </div>

        </div>

    </div>
	
</div>



<style>
.linija{
    max-width: 100%;
    display: flex;
    flex-shrink: 1;
}
.orgs_container{
    padding: 7px;
    display: flex;
    flex-flow: column ;
    gap: 10px;

}

.name_desc{
    padding: 1px;
    align-self: flex-start;
    display: flex;
    flex-flow: column wrap;
    flex-shrink: 1;
    
}

.lista{
    padding: 4px;
    max-height: 3em;
    background-color: rgba(52, 63, 62, 0.703);
    color: azure;
    display: flex;
    
}
.name{
    color: black;
    padding: 2px;
    display: flex;
    text-decoration: none;
    flex-grow: 1;
    flex-shrink: 1;
}

.name:visited{
  color:black;
}

.jedna_org{
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    padding: 7px;
    margin-top: 3px;
	margin-left: 10px;
	margin-right: 10px; 
	border-radius: 10px; 
    border: #242d24 2px solid; 
    background-color: rgba(52, 63, 62, 0.222);
    display: flex;
}

.img_cntr{
    display: flex;
    align-self: flex-start;
    
}

.img_link{
    object-fit: cover;
}
.img_link > img{
    max-width: 8em;
    max-height: 10em;
    object-fit: cover;
    
    
}

/*  @media (max-width: 1000px){

.jedna_org{
    display: grid;
    grid-template-areas: 
    "img ime" 
    "img opis" ;

}
.opis{
    grid-area: "opis";
}
.ime{
    grid-area: "ime";
}
.img_cntr{
    grid-area: "img";
}
}  */



/* a:link{
  color:blue;
}
a:visited{
  color:purple;
}
a:hover{
  color:orange;
}
a:focus{
  color:green;
}
a:active{
  color:red;
} */
/*      CSS HEX 
--alice-blue: #dcedffff;
--powder-blue: #94b0daff;
--lavender-grey: #8f91a2ff;
--charcoal: #505a5bff;
--iron-grey: #343f3eff;

CSS HSL 
--alice-blue: hsla(211, 100%, 93%, 1);
--powder-blue: hsla(216, 49%, 72%, 1);
--lavender-grey: hsla(234, 9%, 60%, 1);
--charcoal: hsla(185, 6%, 34%, 1);
--iron-grey: hsla(175, 10%, 23%, 1);

 SCSS HEX 
$alice-blue: #dcedffff;
$powder-blue: #94b0daff;
$lavender-grey: #8f91a2ff;
$charcoal: #505a5bff;
$iron-grey: #343f3eff;

 SCSS HSL 
$alice-blue: hsla(211, 100%, 93%, 1);
$powder-blue: hsla(216, 49%, 72%, 1);
$lavender-grey: hsla(234, 9%, 60%, 1);
$charcoal: hsla(185, 6%, 34%, 1);
$iron-grey: hsla(175, 10%, 23%, 1);

 SCSS RGB 
$alice-blue: rgba(220, 237, 255, 1);
$powder-blue: rgba(148, 176, 218, 1);
$lavender-grey: rgba(143, 145, 162, 1);
$charcoal: rgba(80, 90, 91, 1);
$iron-grey: rgba(52, 63, 62, 1);

 SCSS Gradient 
$gradient-top: linear-gradient(0deg, #dcedffff, #94b0daff, #8f91a2ff, #505a5bff, #343f3eff);
$gradient-right: linear-gradient(90deg, #dcedffff, #94b0daff, #8f91a2ff, #505a5bff, #343f3eff);
$gradient-bottom: linear-gradient(180deg, #dcedffff, #94b0daff, #8f91a2ff, #505a5bff, #343f3eff);
$gradient-left: linear-gradient(270deg, #dcedffff, #94b0daff, #8f91a2ff, #505a5bff, #343f3eff);
$gradient-top-right: linear-gradient(45deg, #dcedffff, #94b0daff, #8f91a2ff, #505a5bff, #343f3eff);
$gradient-bottom-right: linear-gradient(135deg, #dcedffff, #94b0daff, #8f91a2ff, #505a5bff, #343f3eff);
$gradient-top-left: linear-gradient(225deg, #dcedffff, #94b0daff, #8f91a2ff, #505a5bff, #343f3eff);
$gradient-bottom-left: linear-gradient(315deg, #dcedffff, #94b0daff, #8f91a2ff, #505a5bff, #343f3eff);
$gradient-radial: radial-gradient(#dcedffff, #94b0daff, #8f91a2ff, #505a5bff, #343f3eff);  */

</style>