import Link from "next/link";
import { FannedBooks } from "@/components/FannedBooks";
import { singleBooks } from "@/lib/catalog";

type LibraryVisualProps = {
  className?: string;
};

/** Homepage: a warm reading room with all six books fanned out, inviting the quiz. */
export function LibraryVisual({ className = "" }: LibraryVisualProps) {
  return (
    <div className={`relative isolate overflow-hidden rounded-3xl bg-ink ${className}`}>
      <img
        src="/images/home-library.jpg"
        alt="A cozy reading room with armchairs, a fireplace and shelves full of books"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/35 to-ink/10" />

      <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-cream/95 px-3.5 py-1.5 text-[10px] font-medium tracking-[0.2em] text-ink uppercase shadow-lg">
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        6 books · 1 is yours
      </span>

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-5 pb-6 text-center">
        <FannedBooks books={singleBooks} size={70} />
        <p className="font-serif mt-6 text-2xl leading-tight text-cream sm:text-3xl">
          Which one was written for you?
        </p>
        <p className="mt-2 text-sm text-cream/75">Eight honest questions. Ninety seconds.</p>
        <Link href="/quiz" className="mt-4 inline-flex rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-ink">
          Take the free quiz
        </Link>
      </div>
    </div>
  );
}
