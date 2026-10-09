# One True Book — ispravan upload na GitHub

Sajt se sastoji od fascikli, ne samo od pojedinačnih fajlova. Na GitHub-u mora da postoji `src/app/page.tsx` (NE samo `page.tsx` u korenu repozitorijuma).

## Za postojeći repozitorijum onetruebook-dotcom/onetruebook

1. Skini ZIP sa linka iz poruke i raspakuj ga na kompjuteru (desni klik → Extract All / Extract Here). Nemoj uploadovati sam ZIP.
2. Otvori raspakovanu fasciklu. U njoj moraš videti fascikle `src` i `public`, kao i fajlove `package.json`, `package-lock.json` i `tsconfig.json`.
3. Otvori https://github.com/onetruebook-dotcom/onetruebook/upload/main
4. Iz prozora na svom računaru prevuci CELU fasciklu `src` na GitHub stranicu. Ne otvaraj je i ne biraj njene fajlove pojedinačno. Proveri da GitHub prikazuje putanje koje počinju sa `src/`, npr. `src/app/page.tsx`. Klikni Commit changes.
5. Ponovi postupak za CELU fasciklu `public`. Putanje moraju počinjati sa `public/`, npr. `public/images/hero.jpg`. Klikni Commit changes.
6. U isti GitHub upload ekran dodaj `package-lock.json` iz raspakovane fascikle ako ga još nema u korenu repozitorijuma. Klikni Commit changes.
7. Proveri da se otvara https://github.com/onetruebook-dotcom/onetruebook/blob/main/src/app/page.tsx
8. Ako se otvara, Vercel će sam pokušati deploy. Ako ne, Vercel → projekat → Deployments → ... → Redeploy.

Ako se na GitHub-u ponovo pojave samo `page.tsx`, `Header.tsx` i slični fajlovi u korenu bez `src/`, znači da si pri uploadu ušao UNUTAR fascikle `src` i uploadovao samo njen sadržaj. Prevuci ikonicu cele fascikle `src`.

Ne briši ništa iz repozitorijuma dok novi deploy ne proradi. Stari razbacani fajlovi mogu sačekati.

Nikada nemoj uploadovati `.env`, API ključeve, lozinke ili podatke kartice. ZIP ih ne sadrži.
