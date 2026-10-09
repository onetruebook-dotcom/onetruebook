# Lemon Squeezy — zvanično plaćanje (korak po korak, na srpskom)

Ovo je kompletno uputstvo za vlasnika sajta One True Book.
Sajt je već tehnički spreman. Da bi naplata proradila, treba da mi pošalješ 4 stvari iz tvog Lemon Squeezy naloga.

Ne šalji mi: lozinku, broj kartice, broj bankovnog računa, niti slike ličnih dokumenata.
Banku / PayPal za isplatu povezuješ sam unutar Lemon Squeezy-ja, to meni ne treba.

---

## Šta tačno treba da mi pošalješ (ukratko)

1. `Store ID` — broj tvoje prodavnice
2. `API ključ` — dugačak tajni ključ (posebno test, posebno live)
3. `Variant ID` za svaku od 7 knjiga — ukupno 7 brojeva
4. `Webhook secret` — tajna rečenica koju TI smisliš (npr. 30 nasumičnih slova i brojeva)

Plus potvrda: koji je tvoj Live URL sajta (npr. `https://onetruebook.com`).

Kada mi to pošalješ, ja ubacujem u sigurne environment varijable i testiram kupovinu.

---

## DEO 0 — Napravi nalog i prodavnicu (samo prvi put)

1. Otvori `https://www.lemonsqueezy.com` i klikni **Sign up**.
2. Napravi nalog na svoj email.
3. Kada uđeš u Dashboard, napravi Store (prodavnicu) ako je već nema:
   - Name: `One True Book`
   - Website: `https://onetruebook.com`
   - Završi osnovna podešavanja prodavnice.
4. Ostani u **Test mode** dok ne testiramo. Live uključujemo na kraju.

---

## DEO 1 — Napravi 7 proizvoda (obavezno pre slanja Variant ID-jeva)

Idi: Dashboard (levo) → **Store** → **Products** → **New product** (ili **+ Create product**).

Za svaku knjigu napravi poseban proizvod tipa **Single payment / One-time** (NIKAKO subscription).
Cene moraju biti tačno u dolarima kao na sajtu:

| # | Product name u Lemon Squeezy (kopiraj tačno) | Cena | Slug na našem sajtu |
|---|---|---|---|
| 1 | The Focus Formula | $27.00 | `the-focus-formula` |
| 2 | Money Unlocked | $29.00 | `money-unlocked` |
| 3 | The Habit Architect | $24.00 | `the-habit-architect` |
| 4 | Quiet Confidence | $24.00 | `quiet-confidence` |
| 5 | The Sleep Reset | $22.00 | `the-sleep-reset` |
| 6 | Career Leap | $27.00 | `career-leap` |
| 7 | The One True Collection | $67.00 | `the-clarity-collection` |

Za svaki proizvod:
- Status stavi **Published** (ne Draft).
- Ne pravi dodatne varijante. Jedan proizvod = jedna cena = jedan Variant ID.
- Sačuvaj (Save / Publish).

Ako već imaš proizvode, samo proveri da su imena i cene tačna i da su Published.

---

## DEO 2 — Gde da nađeš Store ID

1. U Lemon Squeezy Dashboard-u idi gore desno ili levo na **Settings**.
2. Klikni **Stores**.
3. Pored imena prodavnice `One True Book` videćeš broj, npr. `123456`.
4. To je Store ID. Kopiraj samo broj.

Alternativa: Store ID se često vidi i u gornjem desnom uglu Dashboard-a pored imena prodavnice.

Zapiši kao:
```text
Store ID: 123456
```

---

## DEO 3 — Gde da napraviš API ključ

1. Idi: **Settings** → **API**.
2. Klikni **+** ili **Create API key** / **New API key**.
3. Za Name upiši npr. `onetruebook-website`.
4. Klikni Create.
5. Lemon Squeezy će ti SAMO JEDNOM pokazati ključ. Odmah klikni **Copy** i sačuvaj ga privremeno u Notepad.
6. Ključ izgleda kao dugačak niz slova, brojeva i `_`, npr. počinje slovima i ima 40+ karaktera.

VAŽNO — test vs live:
- Dok testiramo, napravi ključ dok si u **Test mode**.
- Kada pređemo na pravu naplatu, napravićeš drugi ključ u **Live mode** i poslaćeš mi taj.
- Test ključ radi samo sa test podacima, live ključ samo sa pravim parama.

Zapiši kao:
```text
Test API key: eyJ... (ceo ključ)
```

---

## DEO 4 — Gde da nađeš Variant ID (najvažniji deo, 7 brojeva)

Ovo ljudi najčešće pomešaju. Ne treba mi Product ID, ne treba mi link, treba mi **Variant ID**.

Za proizvode sa jednom cenom (naš slučaj):

1. Idi: **Store** → **Products**.
2. Nađi proizvod npr. `The Focus Formula`.
3. Klikni na **...** (tri tačkice) pored proizvoda.
4. Klikni **Copy Variant ID**.
5. Zalepi broj pored imena knjige.

Ako umesto toga uđeš u proizvod:
- Otvori proizvod → tab **Variants** → pored varijante klikni **...** → **Copy ID**.

Ponovi za svih 7 proizvoda. Svaki Variant ID je broj, npr. `654321`.

Provera: Checkout link izgleda ovako i na kraju ima Variant ID:
```text
https://tvoja-prodavnica.lemonsqueezy.com/checkout/buy/654321
```

### Šablon koji da mi popuniš (kopiraj i zalepi u poruku)

```text
The Focus Formula = 
Money Unlocked = 
The Habit Architect = 
Quiet Confidence = 
The Sleep Reset = 
Career Leap = 
The One True Collection = 
```

Primer kako popunjeno izgleda (brojevi su izmišljeni):
```text
The Focus Formula = 111111
Money Unlocked = 222222
The Habit Architect = 333333
Quiet Confidence = 444444
The Sleep Reset = 555555
Career Leap = 666666
The One True Collection = 777777
```

---

## DEO 5 — Webhook (da sajt zna da je plaćeno)

Webhook je poruka koju Lemon Squeezy šalje našem sajtu posle svake kupovine. Bez njega knjiga se ne otključava.

### 5a. Smisli Webhook secret

Ti smišljaš tajnu od 20–40 karaktera, slova + brojevi. Primer (nemoj koristiti baš ovaj, smisli svoj):
```text
otb9X7q2Lm4Z8w1Rt6Yv3Bn5K
```

Sačuvaj je, trebaće ti na 2 mesta: u Lemon Squeezy-ju i meni.

### 5b. Napravi webhook u Lemon Squeezy-ju

1. Idi: **Settings** → **Webhooks**.
2. Klikni **+** / **Add webhook** / **New webhook**.
3. Za **Endpoint URL** zalepi tačno (zameni preview URL-om dok pravi domen nije živ):
```text
https://onetruebook.com/api/lemon/webhook
```
4. Za **Signing secret** zalepi tajnu koju si smislio u koraku 5a.
5. Za **Events** čekiraj:
   - `order_created` (obavezno)
   - `order_refunded` (obavezno, za povraćaj)
6. Za **Store** izaberi `One True Book`.
7. Klikni **Save** / **Create**.

Dok `onetruebook.com` nije povezan, koristi tvoj trenutni HTTPS preview URL + `/api/lemon/webhook`, npr:
```text
https://3000-xxxx.e2b.app/api/lemon/webhook
```
Kada domen proradi, dođi ovde i promeni URL na pravi domen.

---

## DEO 6 — Kako da mi sve to pošalješ (gotova poruka)

Pošalji mi JEDNU poruku ovako popunjenu. Ne šalji slike ekrana ako možeš da prekucaš brojeve.

```text
LIVE URL SAJTA:
https://onetruebook.com
(ili preview URL ako domen još nije živ)

STORE ID:
...

TEST API KEY:
...

VARIANT IDS:
The Focus Formula = ...
Money Unlocked = ...
The Habit Architect = ...
Quiet Confidence = ...
The Sleep Reset = ...
Career Leap = ...
The One True Collection = ...

WEBHOOK SECRET (koji sam uneo i u Lemon Squeezy):
...

WEBHOOK URL koji sam uneo u Lemon Squeezy:
https://.../api/lemon/webhook

TEST ili LIVE:
TEST
```

Kada prelazimo na pravu naplatu, poslaćeš mi samo novi `LIVE API KEY` i potvrdu da si webhook prebacio na live.

---

## DEO 7 — Šta ja radim kada dobijem podatke

1. Ubacujem u server (nikad u kod koji se vidi javno):
   - `LEMON_SQUEEZY_STORE_ID`
   - `LEMON_SQUEEZY_API_KEY`
   - `LEMON_SQUEEZY_WEBHOOK_SECRET`
   - `LEMON_SQUEEZY_VARIANTS` (JSON mapa slug → Variant ID)
   - `NEXT_PUBLIC_SITE_URL`
2. Proverim na skrivenoj adresi `/api/lemon/status` da li je sve popunjeno (bez otkrivanja tajni).
3. Testiram kupovinu test karticom.
4. Proverim da se knjiga otključava u `/library` i da webhook vraća 200.
5. Tek onda ti kažem da prebaciš prodavnicu u Live i povežeš isplatu.

---

## DEO 8 — Isplata na tvoj račun (ti radiš sam u Lemon Squeezy-ju)

Novac prvo legne na Lemon Squeezy balans, pa tek onda na tebe. Meni ne trebaju ti podaci.

1. U Dashboard-u idi na **Settings** → **Payouts** (ili **Balance / Payouts**).
2. Poveži **bankovni račun** ili **PayPal** za isplatu.
3. Završi verifikaciju identiteta / firme ako Lemon Squeezy traži (KYC).
4. Proveri raspored isplata (obično 1. i 15. u mesecu + zadržavanje ~13 dana za prve isplate, zavisi od naloga).
5. Minimalni prag i provizije pišu na istoj stranici.

Bez završene verifikacije i payout metode, test može da radi, ali pravi novac ne može da ti legne.

---

## Najčešće greške (pročitaj pre slanja)

- Poslat Product ID umesto Variant ID → uvek klikni **Copy Variant ID**, ne Copy Product ID.
- Proizvod je Draft → mora biti Published.
- Cena u Lemon Squeezy-ju nije ista kao na sajtu → ispravi na $27 / $29 / $24 / $24 / $22 / $27 / $67.
- Webhook secret nije isti na oba mesta → mora biti bukvalno isti string ovde i u Lemon Squeezy-ju.
- Webhook URL je HTTP ili bez `/api/lemon/webhook` → mora biti HTTPS i tačna putanja.
- Poslat test API ključ za live prodavnicu (ili obrnuto) → test ključ važi samo u test modu.
- Više varijanti po proizvodu → obriši višak, ostavi jednu cenu po knjizi.

Tehnički detalji za developere su u `PAYMENTS.md`.
