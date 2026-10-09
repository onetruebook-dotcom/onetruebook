type FanBook = {
  slug: string;
  title: string;
  author: string;
  coverImage: string;
  accent: string;
};

type FannedBooksProps = {
  books: FanBook[];
  /** width of each cover in px */
  size?: number;
  className?: string;
};

export function FannedBooks({ books, size = 92, className = "" }: FannedBooksProps) {
  const count = books.length;
  const spread = Math.min(9, 40 / Math.max(count - 1, 1));
  const overlap = size * 0.52;
  const height = size * 1.5;

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size + overlap * (count - 1), height: height + size * 0.28 }}
      aria-hidden="true"
    >
      {books.map((book, index) => {
        const offset = index - (count - 1) / 2;
        return (
          <div
            key={book.slug}
            className="absolute bottom-0 origin-bottom overflow-hidden rounded-[3px] shadow-[0_14px_28px_rgba(0,0,0,0.45)] ring-1 ring-black/20"
            style={{
              left: index * overlap,
              width: size,
              height,
              transform: `rotate(${offset * spread}deg) translateY(${Math.abs(offset) * size * 0.07}px)`,
              zIndex: index + 1,
            }}
          >
            <img src={book.coverImage} alt="" className="h-full w-full object-cover" />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, ${book.accent}99 0%, transparent 40%, rgba(10,8,6,0.85) 100%)`,
              }}
            />
            <div className="absolute inset-y-0 left-0 w-[7px] bg-gradient-to-r from-black/50 to-transparent" />
            <p
              className="font-serif absolute inset-x-2 bottom-2 leading-[1.05] font-semibold text-cream"
              style={{ fontSize: Math.max(10, size * 0.125) }}
            >
              {book.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}
