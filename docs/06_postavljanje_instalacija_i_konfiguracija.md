# Postavljanje, instalacija i konfiguracija

## Prikaz razmještaja

**[TODO]** Dijagram razmještaja i javno postavljanje još nisu određeni. Zahtjevi NF-04 i C-02 traže postavljanje na Linux operacijskom sustavu pomoću alata Podman. Kada se razmještaj odredi, dodati UML dijagram razmještaja (`docs/puml/`), čvorove (korisnički uređaj, poslužitelj aplikacije, PostgreSQL), protokole među njima i poveznicu na javnu adresu.

## Lokalna instalacija i konfiguracija

Aplikacija je SvelteKit projekt koji se povezuje na PostgreSQL bazu putem Drizzle ORM-a. Sve naredbe pokreću se iz korijena repozitorija.

**[TODO]** Podržana verzija Node.js nije definirana (`package.json` nema polje `engines`). `.npmrc` uključuje `engine-strict=true`, pa će se ograničenje primijeniti čim se doda.

1. **Preduvjeti i preuzimanje izvornog koda:** potrebni su Git, Node.js s npm-om i lokalno dostupna PostgreSQL baza.

   ```bash
   git clone https://github.com/brownbird-team/tournament-manager.git
   cd tournament-manager
   ```

2. **Ovisnosti i konfiguracijske varijable:**

   ```bash
   npm ci
   cp .env.example .env
   ```

   U datoteci `.env` postavlja se samo jedna varijabla:

   | Varijabla | Uloga |
   |-----------|-------|
   | `DATABASE_URL` | Adresa veze s PostgreSQL bazom, oblika `postgres://korisnik:lozinka@host:port/naziv-baze`. Sadrži tajne podatke i ne smije se objavljivati; `.env` je u `.gitignore`. |

   Aplikacija se ne pokreće ako `DATABASE_URL` nije postavljen. Naredbe za bazu (`drizzle-kit`) čitaju varijablu iz okruženja ljuske (`process.env`), pa je prije njihova pokretanja postavite i u ljusci.

3. **Inicijalizacija baze podataka i migracija:** stvorite praznu bazu i primijenite shemu.

   ```bash
   createdb tournament_manager
   npm run db:push
   ```

   `db:push` primjenjuje Drizzle shemu iz `src/lib/server/db/schema.ts` izravno na bazu. Skripte `db:generate` i `db:migrate` služe za rad s verzioniranim migracijama, a `db:studio` otvara sučelje za pregled podataka.

   **[TODO]** Shema u `schema.ts` trenutno sadrži samo ogledni zapis iz inicijalizacije projekta i nije usklađena s ER dijagramom (`docs/db/erd.dbml`). Nakon usklađivanja treba opisati stvarne tablice.

4. **Pokretanje i verifikacija:**

   ```bash
   npm run dev
   ```

   Razvojni poslužitelj ispisuje lokalnu adresu `http://localhost:5173`. Provjere koda:

   ```bash
   npm run check
   npm test
   ```

   Pogreške pokretanja ispisuju se u terminalu u kojem je pokrenut `npm run dev`.

   **[TODO]** Dodati korak koji dokazuje da aplikacija trajno sprema podatke u bazu čim postoji funkcionalnost koja to radi.

### Izgradnja PDF dokumentacije

Skripta `docs/build.sh` pomoću alata pandoc spaja datoteke `docs/dd_*.md` u PDF `docs/deliverables/PROINZ26_G09.1_BBTM.pdf`:

```bash
npm run build:docs
```

Potrebni su pandoc i LaTeX.

Dijagrami iz `docs/puml/*.puml` automatski se pretvaraju u slike u `docs/assets/puml/` pri objavi na granu `master` (`.github/workflows/plantuml.yml`).

## Javno postavljanje i administracija

**[TODO]** Postavljanje u produkciju još nije određeno. Kada se odredi, dokumentirati:

| Postavljeni podsustav | Infrastruktura i izvor koda | Naredbe izgradnje i pokretanja | Konfiguracija i varijable okruženja |
|-----------------------|-----------------------------|--------------------------------|-------------------------------------|
| Aplikacija (SvelteKit, adapter-node) | **[TODO]** | `npm run build` (izgradnja); naredba pokretanja **[TODO]** | `DATABASE_URL`; ostale varijable **[TODO]** |
| Baza podataka (PostgreSQL) | **[TODO]** | **[TODO]** mehanizam migracija | **[TODO]** |

- **Podman (NF-04, C-02):** opisati izradu slike, pokretanje kontejnera aplikacije i baze te upravljanje varijablama okruženja na Linuxu. **[TODO]**
- **Nadzor rada i zapisi pogrešaka:** **[TODO]**
- **Upravljanje administratorskim ovlastima (A-04):** **[TODO]** Navesti kako se dodjeljuje uloga administratora.
- **Postupak ažuriranja:** **[TODO]**
- **Sigurnosne kopije i oporavak:** dokumentirati samo ako se stvarno konfiguriraju.
