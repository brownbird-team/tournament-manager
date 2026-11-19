# Ispitivanje

## Pristup ispitivanju

Za izdvojeno ispitivanje komponenti i pravila  projekt koristi Vitest, koji je postavljen u repozitoriju (`npm test`, ispitivanja u `src/**/*.{test,spec}.{js,ts}`). Interakcije u pokrenutoj aplikaciji ispituju se sustavski.

Trenutno u repozitoriju postoji samo ogledno ispitivanje iz inicijalizacije projekta (`src/lib/vitest-examples/greet.spec.ts`) koje ne ispituje funkcionalnosti projekta. Svi ispitni slučajevi u nastavku su planirani i označeni kao **Nije pokrenuto**.

**[TODO]** Odabrati alat za sustavsko ispitivanje u pregledniku (npr. Selenium WebDriver ili Playwright) i navesti gdje se čuvaju dokazi izvođenja.

Kontinuirana integracija za ispitivanja ne postoji: workflow (`.github/workflows/plantuml.yml`) generira UML dijagrame.

## Ispitni slučajevi

Oznake: **CT** komponentni slučajevi, **ST** sustavski slučajevi, **NF** nefunkcijska ispitivanja. Slučajevi uz sebe navode obrazac uporabe (UC) ili zahtjev (F, NF) iz kojeg proizlaze.

| ID ispitnog slučaja | Scenarij ispitivanja | Ulazni podaci | Očekivani rezultat | Stvarni rezultat | Ishod | Koraci ispitivanja |
|---------------------|----------------------|---------------|--------------------|------------------|-------|--------------------|
| CT-01 | Komponenta: round robin bracket (F-15) | 4 natjecatelja u jednoj grupi. | Stvara se 6 mečeva u 3 kruga; svaki par se susreće jednom. | Nije pokrenuto. | Nije pokrenuto | Pozvati generiranje bracketa; prebrojiti mečeve i krugove; provjeriti parove. |
| CT-02 | Komponenta: single elimination bracket (F-15) | 8 natjecatelja, zatim 5 natjecatelja. | Za 8 natjecatelja 7 mečeva; za 5 natjecatelja 4 meča uz slobodne prolaze. | Nije pokrenuto. | Nije pokrenuto | Pozvati generiranje za oba ulaza; prebrojiti mečeve i provjeriti slobodne prolaze. |
| CT-03 | Komponenta: podjela u grupe (F-14) | 10 natjecatelja, najviše 4 po grupi. | Nastaju 3 grupe; nijedna ne sadrži više od 4 natjecatelja. | Nije pokrenuto. | Nije pokrenuto | Pozvati podjelu; provjeriti broj i veličinu grupa. |
| CT-04 | Komponenta: usporedba prijavljenih rezultata (UC-17) | Oba natjecatelja prijavljuju isti rezultat, zatim različite rezultate. | Isti rezultat se pohranjuje; različiti označavaju meč kao sporan i ne pohranjuju pobjednika. | Nije pokrenuto. | Nije pokrenuto | Pozvati provjeru s oba ulaza; provjeriti pobjednika i oznaku spora. |
| CT-05 | Komponenta: widget osobnog područja bez korisnika (F-23) | Widget područja `profile`, bez korisničkih podataka plugina. | Widget se ne priprema (rezultat prazan). | Nije pokrenuto. | Nije pokrenuto | Pozvati pripremu widgeta bez korisnika; provjeriti da nema pogreške i da je rezultat prazan. |
| CT-06 | Komponenta: podaci plugina neodgovarajućeg tipa (F-23) | Zapis s `userTypeId` drugog plugina. | Zapis se odbija s pogreškom. | Nije pokrenuto. | Nije pokrenuto | Pozvati obradu zapisa s pogrešnim tipom; provjeriti odbijanje. |
| CT-07 | Komponenta: korisničko ime već postoji (UC-02) | Korisničko ime koje je već u bazi. | Spremanje se odbija; stanje baze ostaje isto. | Nije pokrenuto. | Nije pokrenuto | Spremiti ime dvaput; provjeriti odbijanje drugog spremanja. |
| ST-01 | Sustav: prijava putem plugina (UC-01) | Valjan račun kod vanjskog pružatelja. | Korisnik je prijavljen i preusmjeren na dashboard. | Nije pokrenuto. | Nije pokrenuto | Odabrati pružatelja; provesti autentifikaciju; provjeriti preusmjeravanje i sesiju. |
| ST-02 | Sustav: pružatelj identiteta nedostupan (UC-01, 3a) | Pružatelj namjerno nedostupan u ispitnom okruženju. | Prikazuje se poruka da korisnik pokuša kasnije; sesija se ne stvara. | Nije pokrenuto. | Nije pokrenuto | Onemogućiti pružatelja; pokušati prijavu; provjeriti poruku i nepostojanje sesije. |
| ST-03 | Sustav: stvaranje organizacije sa zauzetim imenom (UC-04, 2a) | Ime organizacije koje već postoji. | Prikazuje se pogreška; organizacija se ne stvara. | Nije pokrenuto. | Nije pokrenuto | Stvoriti organizaciju; ponoviti s istim imenom; provjeriti pogrešku i broj organizacija. |
| ST-04 | Sustav: stvaranje turnira (UC-09) | Valjani podaci turnira (ime, slug, datum). | Turnir je stvoren unutar organizacije i dostupan na svojoj stranici. | Nije pokrenuto. | Nije pokrenuto | Otvoriti obrazac; unijeti podatke; poslati; otvoriti stranicu turnira. |
| ST-05 | Sustav: prijava na turnir preko ograničenja natjecatelja (UC-12, 4a) | Turnir popunjen do maksimalnog broja natjecatelja. | Prikazuje se poruka o ograničenju; prijava se ne stvara. | Nije pokrenuto. | Nije pokrenuto | Popuniti turnir; prijaviti dodatnog korisnika; provjeriti poruku i popis natjecatelja. |
| ST-06 | Sustav: check-in izvan razdoblja (UC-13, 2a) | Razdoblje za check-in nije otvoreno. | Prikazuje se pogreška; natjecatelj nije označen kao prisutan. | Nije pokrenuto. | Nije pokrenuto | Otvoriti stranicu turnira izvan razdoblja; pokušati check-in; provjeriti stanje. |
| ST-07 | Sustav: odjava nakon početka turnira (UC-14, 2a) | Turnir je započeo. | Odjava se odbija uz objašnjenje; natjecatelj ostaje prijavljen. | Nije pokrenuto. | Nije pokrenuto | Pokrenuti turnir; pokušati odjavu; provjeriti poruku i popis natjecatelja. |
| ST-08 | Sustav: chat tijekom meča (F-22, UC-18) | Dva natjecatelja u aktivnom meču. | Poruka jednog natjecatelja prikazuje se drugome; nakon završetka meča chat je zaključan. | Nije pokrenuto. | Nije pokrenuto | Poslati poruku; provjeriti prikaz kod drugog korisnika; završiti meč; pokušati poslati poruku. |
| ST-09 | Sustav: neslaganje prijavljenih rezultata (UC-17, 3a) | Natjecatelji prijavljuju različite rezultate. | Prikazuje se poruka da se rezultati moraju poklapati; rezultat nije pohranjen. | Nije pokrenuto. | Nije pokrenuto | Prijaviti različite rezultate; provjeriti poruku i stanje meča. |
| ST-10 | Sustav: Bot API s valjanim tokenom (UC-21, F-26) | Valjan API token organizacije; upis rezultata meča. | Rezultat je upisan i vidljiv na stranici meča. | Nije pokrenuto. | Nije pokrenuto | Poslati zahtjev s tokenom; provjeriti odgovor i stranicu meča. |
| ST-11 | Sustav: Bot API bez ovlasti (UC-21, 2a) | Nevaljan ili istekli token. | Zahtjev se odbija; rezultat nije upisan. | Nije pokrenuto. | Nije pokrenuto | Poslati zahtjev s nevaljanim tokenom; provjeriti odgovor i stanje meča. |
| ST-12 | Sustav: resetiranje API tokena (UC-11) | Postojeći token organizacije. | Novi token je prikazan jednom; stari token više ne radi. | Nije pokrenuto. | Nije pokrenuto | Resetirati token; pozvati Bot API starim, zatim novim tokenom; usporediti odgovore. |
| ST-13 | Sustav: izmjena postavki organizacije bez ovlasti (UC-05) | Prijavljeni korisnik koji nije vlasnik organizacije. | Izmjena se odbija; postavke ostaju nepromijenjene. | Nije pokrenuto. | Nije pokrenuto | Pokušati izmjenu kroz aplikaciju i izravnim zahtjevom; provjeriti odgovor i stanje. |
| NF-P-01 | Performanse: 500 korisnika (NF-01) | 500 istodobnih korisnika. | Zadovoljen dogovoreni cilj vremena odziva i udjela pogrešaka. | Nije pokrenuto. | Nije pokrenuto | **[TODO]** Dogovoriti prag i alat za opterećenje; pripremiti podatke; izmjeriti i zabilježiti rezultate. |

## Provedena ispitivanja i rezultati

**Najnovije izvođenje ili dokaz:** **[TODO]** Nakon prvog izvođenja navesti datum, reviziju aplikacije (kratki hash commita), okruženje i poveznicu na dokaze.

## Poznati nedostaci i ograničenja ispitivanja

| Problem ili ograničenje | Korisniku vidljiv učinak ili neprovjereno ponašanje | Dokaz ili poveznica na zadatak |
|-------------------------|------------------------------------------------------|--------------------------------|
| Automatizirana ispitivanja funkcionalnosti projekta još ne postoje | Ponašanje navedeno u ispitnim slučajevima nije provjereno. | `src/lib/vitest-examples/` sadrži samo ogledno ispitivanje. |
| Ispitivanja se ne izvode automatski pri promjenama | Pogreške se mogu otkriti tek pri ručnom pokretanju. | `.github/workflows/plantuml.yml` je jedini workflow. |
| Integracije s vanjskim servisima (pružatelji identiteta, Steam API, tetr.io bot) nisu ispitane | Stvarna prijava i odabir igre nisu provjereni. | **[TODO]** Zadatak ili bilješka o ispitnom okruženju. |
