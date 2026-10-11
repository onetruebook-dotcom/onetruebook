"use client";

import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

export type FeaturedBook = {
  slug: string;
  title: string;
  author: string;
  category: string;
  coverImage: string;
  accent: string;
};

type Gesture = {
  pointerId: number;
  x: number;
  y: number;
  dx: number;
  startedAt: number;
  horizontal: boolean;
};

function Arrow({ left = false }: { left?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={left ? { transform: "rotate(180deg)" } : undefined}>
      <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function relativePosition(index: number, active: number, count: number) {
  let position = (index - active + count) % count;
  if (position > count / 2) position -= count;
  return position;
}

export function BookCarousel({ books }: { books: FeaturedBook[] }) {
  const [active, setActive] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const gesture = useRef<Gesture | null>(null);
  const hintId = useId();
  const count = books.length;
  const book = books[active];

  if (!book) return null;

  const move = (direction: number) => {
    setActive((current) => (current + direction + count) % count);
  };

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setActive(event.key === "Home" ? 0 : count - 1);
    }
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0 || count < 2) return;
    gesture.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      dx: 0,
      startedAt: performance.now(),
      horizontal: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    if (!start || start.pointerId !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!start.horizontal) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        // Preserve normal vertical page scrolling on phones.
        gesture.current = null;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
        return;
      }
      start.horizontal = true;
      setDragging(true);
    }
    start.dx = dx;
    setDragX(Math.max(-140, Math.min(140, dx)));
  }

  function finishGesture(event: PointerEvent<HTMLDivElement>, cancelled = false) {
    const start = gesture.current;
    gesture.current = null;
    setDragging(false);
    setDragX(0);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (!start || cancelled || !start.horizontal) return;
    const elapsed = Math.max(1, performance.now() - start.startedAt);
    const threshold = Math.min(60, event.currentTarget.clientWidth * 0.16);
    if (Math.abs(start.dx) >= threshold || (Math.abs(start.dx) > 18 && Math.abs(start.dx) / elapsed > 0.55)) {
      move(start.dx < 0 ? 1 : -1);
    }
  }

  return (
    <div className="hero-book-carousel" role="region" aria-roledescription="carousel" aria-label="Explore our books" data-active-slug={book.slug}>
      <div className="flex items-center justify-center gap-3 text-[10px] tracking-[0.24em] text-cream/65 uppercase">
        <span className="h-px w-8 bg-gold/60" />
        Your next chapter
        <span className="h-px w-8 bg-gold/60" />
      </div>
      <div
        className={`hero-book-stage ${dragging ? "is-dragging" : ""}`}
        role="group"
        aria-label="Swipe through books"
        aria-describedby={hintId}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(event) => finishGesture(event)}
        onPointerCancel={(event) => finishGesture(event, true)}
        onLostPointerCapture={(event) => {
          if (gesture.current?.pointerId === event.pointerId) finishGesture(event, true);
        }}
      >
        <div className="hero-book-shadow" aria-hidden="true" />
        {books.map((item, index) => {
          const position = relativePosition(index, active, count);
          const distance = Math.abs(position);
          const isActive = distance === 0;
          const scale = isActive ? 1 : distance === 1 ? 0.78 : 0.58;
          const angle = position * 11 + dragX * (isActive ? 0.035 : 0.012);
          const translation = dragX * (isActive ? 1 : 0.3);
          return (
            <div
              key={item.slug}
              className="hero-book-card"
              aria-hidden="true"
              style={{
                zIndex: count - distance,
                opacity: distance > 1 ? 0 : isActive ? 1 : 0.78,
                transform: `translate(-50%, -50%) translateX(${position * 48}%) translateX(${translation}px) translateY(${distance * 16}px) rotate(${angle}deg) scale(${scale})`,
              }}
            >
              <div className="hero-book-face" style={{ backgroundColor: item.accent }}>
                <img src={item.coverImage} alt="" draggable={false} loading={index === 0 ? "eager" : "lazy"} className="h-full w-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${item.accent}b3, transparent 40%, rgba(10,8,6,.94))` }} />
                <div className="hero-book-spine" />
                <div className="absolute inset-x-5 top-6 flex items-center justify-between gap-2 text-[8px] tracking-[0.18em] text-cream/80 uppercase sm:text-[9px]">
                  <span>One True Book</span>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="absolute inset-x-5 bottom-7 text-cream">
                  <p className="mb-3 text-[8px] tracking-[0.22em] text-cream/65 uppercase sm:text-[9px]">{item.category}</p>
                  <p className="hero-book-title font-serif font-semibold">{item.title}</p>
                  <span className="my-4 block h-px w-8 bg-gold/80" />
                  <p className="text-[9px] tracking-[0.15em] text-cream/80 uppercase sm:text-[10px]">{item.author}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-4">
        <button type="button" onClick={() => move(-1)} disabled={count < 2} aria-label="Previous book" className="book-carousel-arrow">
          <Arrow left />
        </button>
        <div className="flex items-center" role="group" aria-label="Choose a book">
          {books.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              aria-label={`Show ${item.title}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => setActive(index)}
              className="book-carousel-dot"
            >
              <span className={index === active ? "is-active" : ""} />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => move(1)} disabled={count < 2} aria-label="Next book" className="book-carousel-arrow">
          <Arrow />
        </button>
      </div>
      <p id={hintId} className="sr-only">
        Swipe, drag or use the arrows to browse all six books.
      </p>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Book {active + 1} of {count}: {book.title} by {book.author}
      </p>
    </div>
  );
}
