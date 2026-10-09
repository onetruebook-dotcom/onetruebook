type BookCoverProps = {
  title: string;
  author: string;
  image: string;
  accent: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "w-[120px]",
  md: "w-[180px]",
  lg: "w-[240px] md:w-[280px]",
};

export function BookCover({
  title,
  author,
  image,
  accent,
  className = "",
  size = "md",
}: BookCoverProps) {
  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <div className="book-3d aspect-[2/3] overflow-hidden rounded-[4px] bg-ink">
        <div className="absolute inset-y-0 left-0 z-10 w-[14px] bg-gradient-to-r from-black/50 to-transparent" />
        <img src={image} alt="" className="h-full w-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${accent}aa 0%, transparent 42%, rgba(10,8,6,0.78) 100%)`,
          }}
        />
        <div className="absolute inset-x-0 bottom-0 z-10 p-4 text-cream">
          <p className="font-serif text-[1.05rem] leading-tight font-semibold tracking-tight">{title}</p>
          <p className="mt-1 text-[10px] tracking-[0.18em] uppercase opacity-80">{author}</p>
        </div>
      </div>
    </div>
  );
}
