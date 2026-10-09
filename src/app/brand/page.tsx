import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Brand kit",
  description: "Official One True Book logos for the website, email, TikTok, Instagram, and Facebook.",
};

const downloads = [
  {
    title: "Original square logo",
    file: "/brand/one-true-book-original.png",
    hint: "1024 × 1024 · cream background, book symbol, green wordmark",
  },
  {
    title: "Profile picture",
    file: "/brand/avatar.jpg",
    hint: "1080 × 1080 · TikTok, Instagram and Facebook",
  },
  {
    title: "Horizontal website logo",
    file: "/brand/logo-user.svg",
    hint: "Scalable vector · the version used in the site header",
  },
  {
    title: "Logo for dark backgrounds",
    file: "/brand/logo-dark.svg",
    hint: "Scalable vector · footer, video outros, dark slides",
    dark: true,
  },
  {
    title: "Book icon",
    file: "/brand/icon-user.svg",
    hint: "Scalable vector · favicon and small-format use",
  },
  {
    title: "Facebook cover",
    file: "/brand/facebook-cover.jpg",
    hint: "1640 × 624 · page banner",
  },
  {
    title: "Email header",
    file: "/brand/email-header.jpg",
    hint: "1200 × 280 · newsletter or email header",
  },
];

export default function BrandPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-[11px] tracking-[0.28em] text-gold-deep uppercase">One True Book · brand kit</p>
      <h1 className="font-serif mt-3 max-w-3xl text-5xl md:text-6xl">The logo, everywhere.</h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-soft">
        The open-book mark and green wordmark you chose are now on the website. Download the formats
        you need for social profiles, email and your store.
      </p>

      <section className="mt-12 grid items-center gap-10 rounded-[2rem] bg-paper p-8 md:grid-cols-[220px_1fr] md:p-12">
        <img
          src="/brand/one-true-book-original.png"
          alt="One True Book open-book logo"
          className="h-52 w-52 object-cover"
        />
        <div>
          <h2 className="font-serif text-4xl">Use one look everywhere</h2>
          <ul className="mt-4 grid gap-2 text-ink-soft">
            <li>— Display name: <strong className="text-ink">One True Book</strong></li>
            <li>— Handle: <strong className="text-ink">@onetruebook</strong></li>
            <li>— Bio: 90-second quiz. One book that actually fits.</li>
            <li>— Website: https://onetruebook.com</li>
          </ul>
        </div>
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-2">
        {downloads.map((item) => (
          <article key={item.file} className="rounded-3xl bg-paper p-6">
            <div
              className={`flex h-44 items-center justify-center overflow-hidden rounded-2xl p-6 ${
                "dark" in item && item.dark ? "bg-moss" : "bg-[#FFF3E0]"
              }`}
            >
              <img src={item.file} alt="" className="max-h-full max-w-full object-contain" />
            </div>
            <h3 className="font-serif mt-5 text-2xl">{item.title}</h3>
            <p className="mt-2 text-sm text-ink-soft">{item.hint}</p>
            <a href={item.file} download className="mt-4 inline-flex rounded-full bg-ink px-4 py-2 text-sm text-cream">
              Download
            </a>
          </article>
        ))}
      </section>

      <section className="mt-16 rounded-[2rem] bg-moss p-8 text-cream md:p-12">
        <h2 className="font-serif text-4xl">Email signature</h2>
        <p className="mt-3 max-w-xl text-cream/75">
          Use the email header above or copy this simple signature into Gmail or Outlook.
        </p>
        <div className="mt-8 overflow-hidden rounded-2xl bg-[#FFF3E0] p-5 text-ink">
          <div className="flex flex-wrap items-center gap-5">
            <img src="/brand/icon-user.svg" alt="One True Book" width={64} height={64} />
            <div>
              <div className="font-serif text-xl leading-none text-[#003C2D]">One True Book</div>
              <div className="mt-2 text-xs tracking-[0.18em] text-[#B39450] uppercase">the quiz finds it</div>
              <div className="mt-2 text-sm">
                <a href="https://onetruebook.com" className="underline">onetruebook.com</a>
                {" · "}@onetruebook
              </div>
            </div>
          </div>
        </div>
        <p className="mt-6 text-sm text-cream/70">
          Logo colors: deep green #003C2D · gold #B39450 · cream #FFF3E0
        </p>
      </section>

      <p className="mt-10 text-sm text-ink-soft">
        <Link href="/" className="underline">Back home</Link>
      </p>
    </main>
  );
}
