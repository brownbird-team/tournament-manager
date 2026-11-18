# Analiza zahtjeva

## Funkcijski zahtjevi

| ID | Opis | Prioritet |
|----|------|-----------|
| F-01 | Sustav omogućuje javni prikaz odabranih podataka o korisniku: korisničko ime, profilnu sliku, opis profila, odabrane widgete. | niski |
| F-02 | Sustav korisniku pruža mogućnost izmjene podataka vlastitog računa. | visoki |
| F-03 | Sustav korisniku omogućuje stvaranje, brisanje, upravljanje organizacijama, dodavanje novih vlasnika, postavljanje *slug-a*, pregled ogranizacija za koje je nadležan. | visoki |
| F-04 | Sustav omogućuje prikaz svih povezanih i povezivanje korisničkog računa sa vanjskim servisima putem oauth2 protokola | visoki |
| F-05 | Sustav prikazuje listu nadolazećih turnira na koje je korisnik prijavljen u ulozi natjecatelja | niski |
| F-06 | Sustav omogućuje pretraživanje korisnika po korisničkom imenu i organizacija po imenu organizacije | niski |
| F-07 | Sustav omogućuje vlasniku organizacije kreiranje turnira unutar organizacije, postavljanje podataka o turniru: ime turnira, slug turnira, banner, opis turnira, pravila, datum i vrijeme, odabir neke od Steam igara kao igru turnira | visoki |
| F-08 | Sustav omogućuje javni prikaz podataka o organizaciji: ime organizacije, opis organizacije, profilnu organizacije | visoki |
| F-09 | Sustav omogućuje prikaz osnovnih podataka o turniru te prikaz nadolazećih, trenutnih i prošlih turnira organizacije | visoki |
| F-10 | Sustav omogućuje postojanje skice turnira koje nisu javno vidljive unutar organizacije | srednji |
| F-11 | Sustav omogućuje kreiranje API tokena na razini organizacije | niski |
| F-12 | Sustav omogućuje postavljanje liste vanjskih usluga koje korisnik mora imati povezane kako bi se prijavio na turnir te prijavu korisnicima koji zadovoljavaju uvjete | visoki |
| F-13 | Sustav omogućuje *check-in* korisnika prije početka turnira | visoki |
| F-14 | Sustav omogućuje podjelu natjecatelja u grupe, odabir maksimalnog broja natjecatelja po grupi, odabir broja natjecatelja koji prelaze u završnu fazu turnira po grupi | visoki |
| F-15 | Sustav podržava algoritme *swiss*, *round robin*, *single elimination* i *double elimination* | srednji |
| F-16 | Sustav omogućuje izmjenu postavki o fazi turnira, odjavu natjecatelja prije početka ili izlazak tijekom turnira | visoki |
| F-17 | Sustav omogućuje prikaz svih natjecatelja na turniru | srednji |
| F-18 | Sustav vlasniku omogućuje izbacivanje natjecatelja sa turnira | srednji |
| F-19 | Sustav vlasniku omogućuje odabir liste widgeta koji će se prikazati na listi natjecatelja, ždrijebu i na stranici meča | srednji |
| F-20 | Sustav korisniku prikazuje njegove nadolazeće mečeve tijekom turnira | srednji |
| F-21 | Sustav vlasniku omogućuje uključivanje ručnog unosa rezultata od strane natjecatelja te natjecateljima omogućuje ručni unos rezultata meča | niski |
| F-22 | Sustav natjecateljima pruža funkcionalnost web chata tijekom meča te ga zaključava nakon završetka, također podržava web chat za organizatore i omogućava komunikaciju sa organizatorom tijekom meča te ga obavještava kada je pozvan | visoki |
| F-23 | Sustav podržava dodavanje načina autentifikacije putem pluginova te svaki od pluginova ima mogućnost kreiranja widgeta koji se prikazuju na različitim sučeljima sustava (spominju se u prethodnim FZ) | visoki |
| F-24 | Sustav tretira administratora kao vlasnika svih organizacija i omogućuje mu izbacivanje korisnika na razini sustava, brisanje organizacija te pregled korisnika i njihovih podataka | niski |
| F-25 | Sustav omogućuje vlasniku izbacivanje korisnika na razini organizacije | niski |
| F-26 | Sustav implementira bot API koji omogućuje programski pristup turniru. Uključene mogućnosti: interakcija sa web chatovima, upis rezultata, pristup podacima o stanju turnira. | visoki |
| F-27 | Sustav omogućuje unos rezultata turnira te pobjednike od strane vlasnika | visoki |

## Nefunkcijski zahtjevi

| ID | Opis | Prioritet |
|----|------|-----------|
| NF-01 | Sustav mora podržavati barem 500 korisnika bez smanjenja kvalitete korisničkog iskustva | niski |
| NF-02 | Sve funkcionalnosti koje Bot API podržava moraju biti adekvatno dokumentirane | niski |
| NF-03 | Sustav mora imati odgovarajuću dokumentaciju | srednji |
| NF-04 | Dokumentacija mora pokrivati sve korake postavljanja sustava na Linux operacijskom sustavu sa Podman alatom | niski |
| NF-05 | Implementacija mora biti modularna kako bi održavanje i dodavanje novih funkcionalnosti bilo moguće bez velikih komplikacija | visoki |
| NF-06 | Sustav mora imati limite na određenim operacijama kako zlonamjerni korisnici ne bi mogli preopteretiti sustav ili ga zapuniti podacima | niski |
| NF-07 | Mogućnost kasnijeg prijevoda aplikacije na više jezika | niski |

## Dionici i akteri

| ID | Uloga | Opis| Obuhvaćeni funkcijski zahtjevi |
|----|-------|-----|--------------------------------|
| A-01 | Korisnik | Bilo koji korisnik koji posjeduje račun na instanci aplikacije. | |
| A-02 | Natjecatelj | Korisnik koji se prijavio na turnir. | |
| A-03 | Vlasnik organizacije | Korisnik koji je postavljen kao jedan od vlasnika organizacije | |
| A-04 | Administrator | Korisnik koji održava instancu aplikacije i ima potpune ovlasti. | |
| A-05 | Posjetitelj | Posjetitelj stranice koji nije autentificiran. | |
| A-06 | Bot | Program koji pristupa sustavu putem API-ja. Vezan je uz organizaciju | |

## Ograničenja i pretpostavke

| ID | Ograničenje ili pretpostavka | Izvor | Posljedica ili način provjere |
|----|-------|-----|--------------------------------|
| C-01 | Prijava u sustav i povezivanje računa mora se provoditi putem OAuth2 protokola. | Zadatak / F04 |  |
| C-02 |Sustav mora biti prilagođen za postavljanje na Linux operacijskom sustavu pomoću alata Podman |Zadatak / NF04 | |
| C-03 | Arhitektura sustava mora biti modularna radi dodavanja novih funkcionalnosti i pluginova | Zadatak / NF05 |
| AS-01 | Vanjski servisi na koje se sustav oslanja bit će stabilni i pouzdani| Prepostavka o vanjskim servisima
| AS-02 | Opterećenje sustava neće značajno prelaziti 500 istovremenih korisnika| Pretpostavka o broju korisnika 
