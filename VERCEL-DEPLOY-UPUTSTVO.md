# Kako da staviš One True Book na internet (Vercel) — korak po korak

Ovo uputstvo je za nekoga ko se prvi put susreće sa ovim. Samo prati redom, ništa ne preskači.
Ako imaš laptop/kompjuter — radi na njemu, mnogo je lakše nego na telefonu.

Na kraju ćeš imati STALAN besplatan link, npr:

```text
https://onetruebook.vercel.app
```

Taj link stavljaš na TikTok. Domen `onetruebook.com` možeš da kupiš kasnije — sajt se ne pravi ponovo, samo se link zameni.

Ništa ne plaćaš. Sve u ovom uputstvu je besplatno.

---

## KORAK 1 — Skini i raspakuj fajlove sajta

1. Otvori link ka `onetruebook-website.zip` koji si dobio u poruci i skini fajl.
2. Raspakuj ga: desni klik → **Extract All** (Windows) ili dvoklik (Mac).
3. Dobićeš fasciklu sa fajlovima: `src`, `public`, `package.json`... To ti treba u Koraku 3.

---

## KORAK 2 — GitHub nalog i repozitorijum

1. Otvori `https://github.com` → **Sign up** → napravi besplatan nalog (email, lozinka, potvrdi kod iz mejla). Izaberi **Free**.
2. Klikni **+** gore desno → **New repository**.
3. **Repository name**: `onetruebook`
4. Ostavi **Public**. NEMOJ da čekiraš "Add a README file".
5. Klikni **Create repository**. Ne gasi stranicu.

---

## KORAK 3 — Ubaci fajlove na GitHub

1. Na toj stranici klikni plavi link **"uploading an existing file"**.
2. Otvori raspakovanu fasciklu, selektuj SVE unutra (Ctrl+A / Cmd+A) i prevuci u GitHub stranicu.
3. Sačekaj upload, pa klikni zeleno **Commit changes** na dnu.

VAŽNO: ne uploaduješ ZIP, nego sadržaj. Na GitHub-u moraš da vidiš fascikle `src`, `public` itd.

---

## KORAK 4 — Uvezi u Vercel i klikni Deploy

1. Otvori `https://vercel.com` → uloguj se → **Add New...** → **Project**.
2. Klikni **Continue with GitHub** → **Authorize Vercel**.
3. Nađi `onetruebook` → **Import**.
4. **Project Name**: `onetruebook`. Framework treba sam da piše **Next.js** — ništa drugo ne diraj.
5. Klikni **Deploy**.
6. Sačekaj 2–4 minuta. Ako na kraju piše **Ready** — super. Ako piše **Failed / Error** (crveno) — TO JE NORMALNO u ovom trenutku: baza još ne postoji. Ništa nije pokvareno. Idi dalje na Korak 5.
7. Klikni **Continue to Dashboard** (ili otvori projekat `onetruebook` sa liste projekata).

Zašto Deploy ide pre baze: Vercel pravi projekat tek kad klikneš Deploy, a bazu možeš da povežeš samo sa projektom koji postoji.

---

## KORAK 5 — Napravi bazu (Neon) i poveži je

Vercel više nema opciju koja se zove "Postgres". Ista stvar se sada zove **Neon** (to je Postgres baza, besplatna).

1. Otvori svoj projekat `onetruebook` u Vercelu.
2. Gore klikni tab **Storage**.
3. Klikni **Create Database** (ili **Create**).
4. U listi (Marketplace Database Providers) izaberi **Neon** — piše uz njega "Serverless Postgres". Klikni **Continue**.
5. Ako pita da izabereš nalog: izaberi **Create New Neon Account** → **Continue**. Ako traži da prihvatiš uslove — **Accept**.
6. Podesi:
   - **Region**: Washington, D.C., USA (US East) — kupci su u Americi, tako je najbrže.
   - **Plan**: **Free**.
   - **Database name**: `onetruebook-db`
7. Klikni **Create** (ili **Continue** pa **Create**). Sačekaj par sekundi.
8. Pojaviće se prozor **Connect Project** (ili klikni dugme **Connect Project** na stranici baze):
   - Projekat: `onetruebook`
   - Environments: ostavi čekirano **Development, Preview, Production**
   - Polje **prefix / Custom Prefix**: NE DIRAJ, ostavi kako jeste
   - Klikni **Connect**.

Provera: idi na projekat → **Settings** → **Environment Variables**. Treba da vidiš `DATABASE_URL` (i još nekoliko sličnih). Ako ga vidiš — baza je povezana.

Tabele u bazi prave se SAME kad neko prvi put otvori sajt. Ne kucaš nikakve komande.

---

## KORAK 6 — Dodaj adresu sajta

1. Saznaj svoj link: projekat → **Settings** → **Domains**. Tu piše tvoj besplatni link, npr. `onetruebook.vercel.app` (ako je to ime zauzeto, biće nešto kao `onetruebook-abc123.vercel.app`).
2. Idi na **Settings** → **Environment Variables** → dodaj:
   - **Key**: `NEXT_PUBLIC_SITE_URL`
   - **Value**: `https://` + tvoj link iz tačke 1, npr. `https://onetruebook.vercel.app`
3. Klikni **Save**.

---

## KORAK 7 — Redeploy (ponovno objavljivanje)

Promene iz Koraka 5 i 6 važe tek posle novog deploy-a.

1. Projekat → tab **Deployments**.
2. Kod poslednjeg (gornjeg) deploy-a klikni **...** (tri tačkice) → **Redeploy** → potvrdi **Redeploy**.
3. Sačekaj 2–4 minuta dok ne piše **Ready** sa zelenom kukicom.
4. Klikni na sliku sajta ili na link — to je TVOJ SAJT NA INTERNETU.

---

## KORAK 8 — Proveri da sve radi

1. Otvori `https://tvoj-link.vercel.app/api/health` — treba da piše `"ok":true`.
2. Otvori početnu — vide se logo i knjige.
3. Uradi kviz do kraja — dobijaš rezultat i preporučenu knjigu.
4. Otvori **Library** — vidi se 7 knjiga.

Ako checkout kaže "Payments are not live yet" — TO JE NORMALNO. Naplatu palimo kada Lemon Squeezy odobri nalog.

---

## KORAK 9 — Stavi link na TikTok

1. TikTok → profil → **Edit profile** → dodaj link u **Website** / bio.
2. Ako link nije klikabilan (novi nalozi): prebaci na Business nalog (Settings → Account → Switch to Business account, besplatno) ili stavi link kao tekst u bio i opis videa.

---

## Kasnije (kada Lemon Squeezy odobri nalog)

1. U Lemon Squeezy napravi 7 proizvoda + webhook (detaljno u `LEMON-SQUEEZY-UPUTSTVO.md`).
2. Vercel → projekat → **Settings** → **Environment Variables** → dodaj:
   - `LEMON_SQUEEZY_API_KEY`
   - `LEMON_SQUEEZY_STORE_ID`
   - `LEMON_SQUEEZY_WEBHOOK_SECRET`
   - `LEMON_SQUEEZY_VARIANTS`
3. **Deployments** → **...** → **Redeploy**.

## Još kasnije (domen onetruebook.com)

1. Kupi domen (Cloudflare, Porkbun, Namecheap...).
2. Vercel → projekat → **Settings** → **Domains** → **Add** → `onetruebook.com` → prati uputstvo za DNS.
3. Promeni `NEXT_PUBLIC_SITE_URL` na `https://onetruebook.com`, promeni webhook URL u Lemon Squeezy-ju, pa Redeploy.

---

## Ako nešto ne radi

**Ne vidim "Postgres" u Storage:** normalno — izaberi **Neon** (Korak 5).

**Ne mogu da izaberem svoj projekat kod Connect Project:** projekat još ne postoji. Vrati se na Korak 4 i klikni **Deploy** (čak i ako bude crveno).

**Posle Redeploy-a i dalje crveno (Failed):** projekat → **Deployments** → klikni na taj deploy → **Build Logs** → skroluj na dno, slikaj grešku i pošalji mi.

**`/api/health` piše `not_connected`:** baza nije povezana. Ponovi Korak 5 (tačka 8, Connect Project), pa Korak 7 (Redeploy).

**`/api/health` piše `unreachable`:** baza je povezana ali se ne javlja. Sačekaj minut (besplatna baza se "budi") pa osveži. Ako i dalje ne radi — slikaj i pošalji mi.

**"Failed to set environment variables" kod Connect:** u Settings → Environment Variables obriši ranije ručno dodat `DATABASE_URL` (ako si ga dodavao), pa ponovo Connect.

**GitHub kaže da je fajl prevelik:** uploaduješ pogrešnu fasciklu (`node_modules` ili `.next`). Uploaduj samo ono što je bilo u mom ZIP-u.
