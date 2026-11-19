# Arhitektura i oblikovanje

[Primjeri](https://github.com/VladoSruk/Programsko-inzenjerstvo/blob/main/docs/4-Arhitektura-i-oblikovanje.md)

## Ključne arhitekturne odluke

**[TREBA PREGLEDATI]** Potvrditi da sve odgovara alternativama koje stvarno razmatramo.

| Odluka | Razmatrana alternativa | Projektno specifično obrazloženje i kompromis |
|--------|------------------------|-----------------------------------------------|
| Jedna SvelteKit aplikacija (web sučelje, korisnički API i Bot API) koja se izvodi na Node.js poslužitelju | Odvojena frontend aplikacija i zaseban backend poslužitelj | Jedna aplikacija smanjuje napor izgradnje i postavljanja za opseg kolegija, a granice između komponenti ostaju logičke . Kompromis: kvar aplikacije istodobno pogađa web sučelje i Bot API. Obrazloženje je u ADR-01. |
| Relacijska baza PostgreSQL uz Drizzle ORM | Dokumentno orijentirana baza ili ručno pisan SQL | Turniri, grupe, faze, mečevi i natjecatelji povezani su čvrstim vezama i složenim ključevima koje relacijska shema čini eksplicitnima. Kompromis: promjene sheme zahtijevaju migracije. |
| Autentifikacija i widgeti dodaju se kao pluginovi | Ugrađen fiksni popis pružatelja identiteta | Sustav mora podržati više vanjskih servisa i third-party widgete bez izmjene jezgre (F-04, F-23, NF-05). Kompromis: složeniji tipovi i ugovor između jezgre i plugina. Obrazloženje je u ADR-02. |
| Zaseban Bot API s tokenom na razini organizacije | Bot koristi isti API kao i web klijent s korisničkim sesijama | Bot ima samo dio funkcionalnosti (chat, upis rezultata, stanje turnira) i drukčiji način autentifikacije (F-11, F-26). Kompromis: dva ulazna sloja koja moraju dijeliti ista pravila ovlasti. |
| Podaci specifični za algoritam turnira pohranjuju se kao JSON (`mm_data`, `mm_type` u fazi i sudioniku grupe) | Zasebne tablice za svaki algoritam (Swiss, round robin, eliminacije) | Algoritmi imaju različito pomoćno stanje pa je jedna općenita struktura jednostavnija i lakše se proširuje (F-15). Kompromis: baza ne provjerava oblik tih podataka, nego aplikacija. |

## Gradivni blokovi i UML dijagram komponenata

![](assets/puml/cmp.png)

| Komponente | Odgovornost | Razlog za ovu granicu |
|------------|-------------|-----------------------|
| Web klijent | Prikazuje korisničko sučelje aplikacije i omogučuje korisniku interakciju sa sustavom | Korisnička interakcija je odvojena od poslužiteljske logike |
| Korisnički API | Ostvaruje komunikaciju između web sučelja i internih servisa | Način komunikacije specifičan za SvelteKit |
| Bot API | Omogućuju vanjskim programima pristup stanju turnira, chatu i upisu rezultata putem API tokena | Pristup samo parcijalnom dijelu funkcionalnosti i drugačiji način autentifikacije |
| Upravitelj korisnicima | Učitava sve konfigurirane načine autentifikacije te upravlja korisničkim računima | Komponenta je dovoljno izolirana da predstavlja vlastitu cjelinu |
| Web chat upravitelj | Podrška za chat funkcionalnost u aplikaciji: pohrana poruka | Komponenta je dovoljno izolirana da predstavlja vlastitu cjelinu |
| Upravitelj turnira | Implementira sve potrebne algoritme za generiranje ždrijeba, kreira mečeve, grupe i pohranjuje strukturu turnira u bazu | Komponenta je dovoljno izolirana da predstavlja vlastitu cjelinu |
| Upravitelj organizacijama | Upravlja postavkama organizacija i ovlastima korisnika u njima | Komponenta je dovoljno izolirana da predstavlja vlastitu cjelinu |

## ER dijagram i model podataka

![](db/erd.png)

[Otvori na dbdiagram.io](https://dbdiagram.io/d/Tournament-Manager-6aed988d7ded3580faca7098)

Model podataka definiran je u [erd.dbml](db/erd.dbml). **[TODO]** Drizzle shema u `src/lib/server/db/schema.ts` još sadrži samo ogledni zapis iz inicijalizacije projekta i nije usklađena s ER dijagramom; nakon usklađivanja navesti razlike koje su važne za razumijevanje.

## Reprezentativni UML dijagram razreda

Prikazan je sustav pluginova jer on određuje način proširenja autentifikacije i widgeta. Dijagram odgovara trenutnom stanju koda na grani `rdobovic/plugins`. **[TREBA PREGLEDATI]** Uskladiti s kodom nakon spajanja u `master` i dodati poveznicu na implementaciju (`src/lib/plugins/`).

![](assets/puml/cd_plugin.png)

Plugin deklarira svoje widgete i tri kuke za autentifikaciju (`authSetup`, `authRequest`, `authRefresh`). `PluginWrapper` omata plugin, provjerava tip korisničkih podataka koje plugin vraća i priprema widgete za prikaz. `PluginRegistry` objedinjuje sve instalirane pluginove, a na klijentskoj strani `WidgetRegistry` na temelju primljenog opisa (`WidgetRenderSpec`) pronalazi komponentu koju treba prikazati.

PlantUML izvor: [cd_plugin.puml](puml/cd_plugin.puml)

## Ponašanje tijekom izvođenja

### Reprezentativni UML sekvencijski dijagram

**Scenarij:** prijava u sustav putem plugina i inicijalizacija računa pri prvoj prijavi (UC-01, UC-02). **[TREBA PREGLEDATI]**

![](assets/puml/seq_prijava.png)

Dijagram prikazuje redoslijed poruka između web klijenta, korisničkog API-ja, upravitelja korisnicima, plugina i vanjskog pružatelja identiteta. Prikazane su dvije alternative iz obrazaca uporabe: pružatelj nije dostupan (UC-01, 3a) i korisničko ime je zauzeto (UC-02, 1a).

PlantUML izvor: [seq_prijava.puml](puml/seq_prijava.puml)

### Reprezentativni UML dijagram stanja

**Vlasnik stanja i razlog odabira:** meč turnira. Stanje meča određuje što natjecatelji, organizator i bot smiju napraviti (chat, upis rezultata, prijava sporova), a u modelu podataka ga određuju polja `status`, `alert`, prijavljeni rezultati i `winner_id`. **[TREBA PREGLEDATI]** Vrijednosti stanja predložene su iz obrazaca uporabe (UC-15, UC-16, UC-17) i zahtjeva F-21, F-22, F-27; stupac `status` u ER dijagramu još nema definiran skup vrijednosti.

![](assets/puml/sm_mec.png)

PlantUML izvor: [sm_mec.puml](puml/sm_mec.puml)

## Zapisi arhitekturnih odluka

### ADR-01: Jedna SvelteKit aplikacija za web sučelje i API-je

| Polje | Zapis odluke |
|-------|--------------|
| Kontekst i cilj | Tim tijekom jednog semestra mora izraditi sustav koji ima web sučelje, korisnički API i Bot API te ga omogućiti za postavljanje pomoću Podman-a (C-02). |
| Kriteriji odluke | Mogućnost da tim izgradi, poveže i postavi sustav u zadanom roku; zadržavanje jasnih odgovornosti komponenti (NF-05). |
| Razmatrane alternative | **Jedna aplikacija:** sučelje i API-ji dijele izvorni kod i izvršni proces. **Odvojeni frontend i backend:** neovisno postavljanje, ali dodatni rad na integraciji i postavljanju. |
| Odluka i obrazloženje | Koristiti SvelteKit za sučelje, korisnički API i Bot API, uz logički odvojene module. Time se smanjuje rad na postavljanju, uz prihvaćeno ograničenje da kvar aplikacije utječe na sve ulazne točke. |
| Status | Predloženo. **[TREBA PREGLEDATI]** |

### ADR-02: Pluginovi za autentifikaciju i widgete

| Polje | Zapis odluke |
|-------|--------------|
| Kontekst i cilj | Prijava i povezivanje računa moraju ići putem OAuth2 protokola (C-01), a sustav mora omogućiti dodavanje novih načina autentifikacije i widgeta bez većih izmjena (F-23, NF-05). |
| Kriteriji odluke | Proširivost bez izmjene jezgre; tipska sigurnost granice između jezgre i plugina; izolacija podataka koje plugin pohranjuje uz korisnika. |
| Razmatrane alternative | **Plugin sustav:** svaki plugin opisuje autentifikaciju i widgete kroz zajedničko sučelje. **Ugrađeni pružatelji:** autentifikacija pojedinih servisa (npr. Steam, tetr.io) izravno je dio jezgre. |
| Odluka i obrazloženje | Uvesti plugin sustav s registrom pluginova (poslužitelj) i registrom widgeta (klijent). Kompromis: složeniji tipovi, ali dodavanje novog servisa ne dira jezgru. |
| Status | Predloženo; implementacija u izradi na `rdobovic/plugins`. **[TREBA PREGLEDATI]** |

## Zajednička pravila oblikovanja

**[TREBA PREGLEDATI]** 

| Aspekt | Mehanizam | Pravilo | Mjesto primjene |
|--------|-----------|---------|-----------------|
| Konfiguracija | Varijable okruženja | Aplikacija se ne pokreće bez `DATABASE_URL`; stvarne vrijednosti ne ulaze u repozitorij. | `src/env.ts`, `src/lib/server/db/index.ts`, `drizzle.config.ts` |
| Podaci plugina | Provjera tipa korisničkih podataka | Podaci koje plugin pohranjuje uz korisnika nose identifikator tipa (`userTypeId`); neodgovarajući tip se odbija prije uporabe. | `PluginWrapper` |
| Autorizacija (planirano) | Provjera ovlasti na poslužitelju | Ovlasti vlasnika organizacije, administratora i bota (A-03, A-04, A-06) provjeravaju se na poslužiteljskoj strani za svaki zaštićeni zahtjev; skrivanje elemenata sučelja nije zaštita. | Korisnički API i Bot API |
| Ograničenja operacija (planirano) | Ograničavanje broja zahtjeva i količine podataka | Određene operacije imaju limite kako zlonamjerni korisnici ne bi preopteretili ili zapunili sustav (NF-06). | Korisnički API i Bot API |
| Prijevod (planirano) | Odvajanje tekstova od koda | Tekstovi sučelja trebaju biti odvojeni da bi kasniji prijevod bio moguć (NF-07). | Web klijent |

## Arhitekturni rizici i tehnički dug

**[TREBA PREGLEDATI]**

**Tehnički rizici i dug**

| Rizik ili kompromis | Posljedica | Odgovor na rizik |
|---------------------|------------|------------------|
| Jedna instanca aplikacije poslužuje web sučelje i oba API-ja | Kvar aplikacije privremeno onemogućuje sve funkcionalnosti, uključujući Bot API. | Prihvaćeno u okviru ograničenja projekta za kolegij; ne uvodi se pričuvna instanca. |
| JSON polja (`mm_data`, `archived_data`, `auth_data`) nemaju shemu u bazi | Neispravni podaci mogu proći u bazu ako ih aplikacija ne provjeri. | Provjera oblika u aplikaciji prije pohrane. |
| Plugin sustav je složen i još u izradi | Dodavanje novog plugina može biti teže nego što NF-05 nalaže. | **[TODO]** Provjeriti pisanjem barem dva ogledna plugina i dokumentirati ugovor plugina. |
| API token organizacije pohranjen je u tekstualnom polju (`organization.api_token`) | UC-11 token prikazuje samo jednom, što upućuje na to da se ne smije čuvati u čitljivom obliku. | **[TODO]** Odlučiti pohranjuje li se samo sažetak tokena. |
| Mehanizam prijenosa poruka u stvarnom vremenu (web chat) nije određen u dokumentaciji ni kodu | Odabir utječe na broj istodobnih korisnika (NF-01) i način postavljanja. | **[TODO]** Odabrati mehanizam i dopuniti ADR-om. |

**Poslovni ili domenski rizici**

| Rizik | Posljedica | Odgovor na rizik |
|-------|------------|------------------|
| Vanjski servisi (pružatelji identiteta, Steam API) nisu dostupni | Prijava ili odabir igre za turnir privremeno ne radi. | Korisniku se prikazuje poruka da pokuša kasnije (UC-01, 3a); ostatak aplikacije radi. |
| Natjecatelji prijave različite rezultate meča | Rezultat se ne može automatski pohraniti. | Aplikacija traži od natjecatelja da obavijeste organizatora, a meč se označava kao sporan (UC-17, 3a). |
