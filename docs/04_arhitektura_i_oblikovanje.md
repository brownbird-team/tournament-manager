# Arhitektura i oblikovanje

[Primjeri](https://github.com/VladoSruk/Programsko-inzenjerstvo/blob/main/docs/4-Arhitektura-i-oblikovanje.md)

## Ključne arhitekturne odluke
| Odluka | Razmatrana alternativa | Projektno specifično obrazloženje i kompromis |
| --- | --- | --- |
| SvelteKit s server-side renderom | Čisti client-side rendering (SPA) | Stranice turnira i organizacija indeksirane su od pretraživača bez izvršavanja JavaScripta, što je važno jer se na njih dolazi iz vanjskih izvora. Zahtijeva održavanje server render rute uz interaktivni klijent. |
| PostgreSQL za pohranu strukture turnira | NoSQL (npr. MongoDB) | Turnir ima više razina povezanih entiteta (faza, grupa, meč, natjecatelj) i transakcije koje osiguravaju konzistentnost stanja. |
| Drizzle ORM | Ručno pisanje SQL-a | Drizzle zadržava TypeScript tipove izravno iz sheme baze. |
| WebSocket za chat i automatsko osvježavanje stanja mečeva | REST polling | F-22 traži instant dostavu poruka, a stanje mečeva (rezultat, sljedeći protivnik) mijenja se bez korisničke akcije pa klijent ne bi trebao ručno osvježavati stranicu. Zahtijeva upravljanje reconnectom pri prekidima veze. |

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

## Reprezentativni UML dijagram razreda

![](assets/puml/cd.png)