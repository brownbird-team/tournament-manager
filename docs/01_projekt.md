# Opseg projekta

## Problem i cilj projekta

Postojeće platforme za upravljanje turnirima, poput Challonga, pokrivaju osnovne potrebe organiziranja natjecanja, ali imaju ograničenja za organizatore koji žele prilagoditi proces vlastitim potrebama.

Arhitektura tih platformi je zatvorena, nije moguće dodati vlastite načine autentikacije ili prikaz podataka iz vanjskih servisa bez čekanja da to napravi sam pružatelj usluge. Ne postoji standardni programski pristup koji bi omogućio vanjskim alatima automatsko čitanje stanja turnira, upis rezultata iz izvora na kojima se mečevi odvijaju ili slanje poruka natjecateljima. 

Komunikacija tijekom mečeva i prijava problema organizatoru često ostaje van sustava, natjecatelji moraju koristiti zasebne kanale (Discord, forum) dok organizator ručno prati tko je prisutan, tko je završio meč i tko traži pomoć.

BrownBird Tournament Manager nastao je kao odgovor na ta ograničenja. Cilj je pružiti modularan sustav u kojem organizator može izabrati koje formate turnira koristi, koji vanjski servisi autentificiraju natjecatelje i koje alate ili botove može povezati za automatizaciju upisa rezultata i praćenja stanja. 

Sustav uključuje web chat vezan uz meč, jednostavan sustav za prijavu rezultata i prijavu problema organizatoru, te Bot API koji vanjskim aplikacijama omogućuje programski pristup onim dijelovima turnira koje organizator odobri.

## Ciljani korisnici i dionici
| Skupina korisnika ili dionika | Potreba ili interes relevantan za ovaj projekt |
|----|----|
| Natjecatelj | Prijavljuje se i sudjeluje u turniru, prijavljuje rezultate mečeva |
| Organizator turnira | Stvara organizaciju te turnire za natjecatelje |
| Gledatelj turnira | Vanjski posjetitelj koji prati događanja u turniru |


## Granice projekta
**Uključeno**: Web aplikacija za upravljanje organizacijama i esports turnirima različitih formata (Swiss, Round Robin, Single i Double Elimination) s podrškom za check-in, grupne i završne faze natjecanja. Sustav obuhvaća web chat u stvarnom vremenu tijekom mečeva, ručni unos rezultata, modularnu podršku za proširenja (pluginove) s widgetima te Bot API za programski pristup stanju turnira, chatu i upisu rezultata.


**Izvan opsega ili odgođeno**: Direktna integracija s računalnim igrama i drugim aplikacijama (npr. pripremanje sobe za meč), jer je takva automatizacija prepuštena vanjskim alatima putem Bot API-ja. REST API za upravljanje korisnicima platforme i organizacijama zbog opsega i vremenskog okvira projekta. Prevođenje sučelja na više jezika

## Postojeći pristupi i opravdanost projekta

Trenutačni pristupi za rješavanje problema organizacije turnira ne dopuštaju korisniku dovoljnu personalizaciju. Stvari poput upravljanja turnira putem API-ja su ili nepostojeće ili se posebno plaćaju. Također ne postoji aplikacija koja dopušta jednostavno dodavanje modula kako bi se omogućili dodatni načini autentifikacije.