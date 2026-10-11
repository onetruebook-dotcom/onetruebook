"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import type { ReaderStory } from "@/lib/homepage-content";
import { useReducedMotion } from "@/components/useReducedMotion";

function Arrow({ left = false }: { left?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={left ? { transform: "rotate(180deg)" } : undefined}>
      <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type MouseGesture = {
  pointerId: number;
  x: number;
  scrollLeft: number;
  index: number;
  dx: number;
};

export function TestimonialsCarousel({ stories }: { stories: ReaderStory[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef(0);
  const targetRef = useRef<number | null>(null);
  const gestureRef = useRef<MouseGesture | null>(null);
  const [dragging, setDragging] = useState(false);
  const [view, setView] = useState({ index: 0, visible: 3 });
  const reducedMotion = useReducedMotion();
  const maxIndex = Math.max(0, stories.length - view.visible);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    let frame = 0;
    let settle: ReturnType<typeof setTimeout> | undefined;

    const update = () => {
      const card = viewport.querySelector<HTMLElement>("[data-reader-story]");
      if (!card) return;
      const gap = parseFloat(getComputedStyle(viewport).columnGap) || 0;
      const step = card.getBoundingClientRect().width + gap;
      if (!step) return;
      stepRef.current = step;
      const visible = Math.min(stories.length, Math.max(1, Math.round((viewport.clientWidth + gap) / step)));
      const index = Math.max(0, Math.min(stories.length - visible, Math.round(viewport.scrollLeft / step)));
      setView((old) => old.index === index && old.visible === visible ? old : { index, visible });
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
      clearTimeout(settle);
      settle = setTimeout(() => { targetRef.current = null; }, 150);
    };

    const onResize = () => {
      targetRef.current = null;
      update();
    };
    update();
    viewport.addEventListener("scroll", onScroll, { passive: true });
    const observer = new ResizeObserver(onResize);
    observer.observe(viewport);

    return () => {
      viewport.removeEventListener("scroll", onScroll);
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      clearTimeout(settle);
    };
  }, [stories.length]);

  function goTo(index: number) {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const next = Math.min(maxIndex, Math.max(0, index));
    targetRef.current = next;
    viewport.scrollTo({ left: next * stepRef.current, behavior: reducedMotion ? "auto" : "smooth" });
  }

  function move(direction: number) {
    const current = targetRef.current ?? view.index;
    let next = current + direction;
    if (next < 0) next = maxIndex;
    if (next > maxIndex) next = 0;
    goTo(next);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    // Touch uses the browser's native scrolling and inertia; add mouse dragging separately.
    if (event.pointerType !== "mouse" || event.button !== 0 || maxIndex === 0) return;
    const viewport = event.currentTarget;
    targetRef.current = null;
    viewport.scrollTo({ left: viewport.scrollLeft, behavior: "auto" });
    gestureRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      scrollLeft: viewport.scrollLeft,
      index: Math.round(viewport.scrollLeft / stepRef.current),
      dx: 0,
    };
    viewport.style.scrollSnapType = "none";
    viewport.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    gesture.dx = event.clientX - gesture.x;
    if (Math.abs(gesture.dx) < 5) return;
    event.preventDefault();
    setDragging(true);
    event.currentTarget.scrollLeft = gesture.scrollLeft - gesture.dx;
  }

  function finishGesture(event: PointerEvent<HTMLDivElement>, cancelled = false) {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    gestureRef.current = null;
    setDragging(false);
    const viewport = event.currentTarget;
    let next = Math.round(viewport.scrollLeft / stepRef.current);
    if (!cancelled && Math.abs(gesture.dx) >= 40 && next === gesture.index) {
      next += gesture.dx < 0 ? 1 : -1;
    }
    viewport.style.scrollSnapType = "";
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    goTo(next);
  }

  if (!stories.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-5 py-16" aria-labelledby="reader-stories-heading" aria-describedby="reader-stories-notice" aria-roledescription="carousel">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <h2 id="reader-stories-heading" className="font-serif text-4xl">Readers who stopped guessing</h2>
        <div className="flex shrink-0 items-center gap-3">
          <button type="button" className="review-carousel-arrow" aria-label="Previous reviews" aria-controls="reader-stories-track" onClick={() => move(-1)} disabled={maxIndex === 0}>
            <Arrow left />
          </button>
          <button type="button" className="review-carousel-arrow" aria-label="Next reviews" aria-controls="reader-stories-track" onClick={() => move(1)} disabled={maxIndex === 0}>
            <Arrow />
          </button>
        </div>
      </div>
      <p id="reader-stories-notice" className="mt-3 text-sm leading-relaxed text-ink-soft">
        Illustrative reviews with fictional names — not verified customer testimonials.
      </p>

      <div
        id="reader-stories-track"
        ref={viewportRef}
        className={`review-carousel-track mt-10 ${dragging ? "is-dragging" : ""}`}
        role="group"
        aria-label="Sample reviews; swipe or use the navigation arrows"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(event) => finishGesture(event)}
        onPointerCancel={(event) => finishGesture(event, true)}
        onLostPointerCapture={(event) => finishGesture(event, true)}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          } else if (event.key === "Home" || event.key === "End") {
            event.preventDefault();
            goTo(event.key === "Home" ? 0 : maxIndex);
          }
        }}
      >
        {stories.map((story, index) => (
          <blockquote
            key={story.id}
            data-reader-story
            className="review-carousel-card flex flex-col rounded-3xl bg-paper p-8"
            role="group"
            aria-roledescription="slide"
            aria-label={`Illustrative review ${index + 1} of ${stories.length}`}
          >
            <p className="font-serif flex-1 text-2xl leading-snug">“{story.quote}”</p>
            <footer className="mt-6 text-sm text-ink-soft">
              {story.name} · {story.role}
            </footer>
          </blockquote>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        Showing sample reviews {view.index + 1} through {Math.min(view.index + view.visible, stories.length)} of {stories.length}.
      </p>
      <span className="sr-only" data-review-position aria-hidden="true">
        {String(view.index + 1).padStart(2, "0")}–{String(Math.min(view.index + view.visible, stories.length)).padStart(2, "0")}/{String(stories.length).padStart(2, "0")}
      </span>
    </section>
  );
}
