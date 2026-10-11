"use client";

import { useEffect, useRef, useState } from "react";
import type { HomepageStat } from "@/lib/homepage-content";

const duration = 3200;
const startDelay = 180;
const viewportTop = 88;
const viewportBottom = 24;

function formattedValue(stat: HomepageStat, progress: number) {
  const decimals = progress >= 1 ? (stat.decimals ?? 0) : (stat.animationDecimals ?? stat.decimals ?? 0);
  const factor = 10 ** decimals;
  const start = stat.start ?? 0;
  const value = progress >= 1 ? stat.value : Math.floor((start + (stat.value - start) * progress) * factor) / factor;

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function AnimatedStats({ stats }: { stats: HomepageStat[] }) {
  const numbersRef = useRef<HTMLDListElement>(null);
  // Start at the beginning in both server HTML and React. The animation no longer
  // flashes the final figures before hydration, and waits for the actual numbers.
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const numbers = numbersRef.current;
    if (!numbers) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let visibilityFrame = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let played = false;
    let running = false;
    let disposed = false;

    const cancel = () => {
      window.cancelAnimationFrame(animationFrame);
      clearTimeout(timer);
      timer = undefined;
      running = false;
    };

    const visibility = () => {
      const rect = numbers.getBoundingClientRect();
      const top = Math.min(viewportTop, window.innerHeight * 0.15);
      const bottom = window.innerHeight - viewportBottom;
      const availableHeight = Math.max(1, bottom - top);
      const visibleHeight = Math.max(0, Math.min(bottom, rect.bottom) - Math.max(top, rect.top));
      return {
        ready: visibleHeight >= Math.min(rect.height, availableHeight) * 0.65,
        outside: rect.bottom <= top || rect.top >= window.innerHeight,
      };
    };

    const start = () => {
      if (played || timer !== undefined || disposed || document.hidden) return;
      timer = setTimeout(() => {
        timer = undefined;
        if (disposed || document.hidden || media.matches || !visibility().ready) return;
        played = true;
        running = true;
        let startedAt: number | undefined;

        const tick = (now: number) => {
          if (disposed) return;
          startedAt ??= now;
          const elapsed = Math.min((now - startedAt) / duration, 1);
          // A shared smoothstep timeline keeps every number moving together,
          // with a visible middle section rather than an immediate jump near the end.
          setProgress(elapsed === 1 ? 1 : elapsed * elapsed * (3 - 2 * elapsed));
          if (elapsed < 1) {
            animationFrame = window.requestAnimationFrame(tick);
          } else {
            running = false;
          }
        };
        animationFrame = window.requestAnimationFrame(tick);
      }, startDelay);
    };

    const check = () => {
      if (disposed) return;
      if (media.matches) {
        cancel();
        played = true;
        setProgress(1);
        return;
      }
      if (document.hidden) {
        if (running || timer !== undefined) {
          cancel();
          played = false;
          setProgress(0);
        }
        return;
      }

      const visible = visibility();
      if (visible.outside) {
        // Re-arm only after the numbers leave the viewport completely, so a
        // small scroll within this section never interrupts the count-up.
        cancel();
        played = false;
        setProgress(0);
      } else if (visible.ready) {
        start();
      } else if (timer !== undefined) {
        clearTimeout(timer);
        timer = undefined;
      }
    };

    const scheduleCheck = () => {
      window.cancelAnimationFrame(visibilityFrame);
      visibilityFrame = window.requestAnimationFrame(check);
    };

    const onPreferenceChange = () => {
      cancel();
      played = false;
      setProgress(media.matches ? 1 : 0);
      scheduleCheck();
    };

    // Scroll/resize is also a fallback for browsers without IntersectionObserver.
    window.addEventListener("scroll", scheduleCheck, { passive: true });
    window.addEventListener("resize", scheduleCheck);
    document.addEventListener("visibilitychange", scheduleCheck);
    media.addEventListener("change", onPreferenceChange);
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(scheduleCheck, {
      threshold: [0, 0.65, 1],
      rootMargin: `-${viewportTop}px 0px -${viewportBottom}px 0px`,
    });
    observer?.observe(numbers);
    document.fonts?.ready.then(() => { if (!disposed) scheduleCheck(); });
    check();

    return () => {
      disposed = true;
      cancel();
      window.cancelAnimationFrame(visibilityFrame);
      observer?.disconnect();
      window.removeEventListener("scroll", scheduleCheck);
      window.removeEventListener("resize", scheduleCheck);
      document.removeEventListener("visibilitychange", scheduleCheck);
      media.removeEventListener("change", onPreferenceChange);
    };
  }, []);

  return (
    <section
      aria-label="One True Book at a glance"
      className="border-y border-ink/10 bg-paper"
      data-countup-version="2"
      data-countup-state={progress === 0 ? "waiting" : progress >= 1 ? "complete" : "counting"}
    >
      <noscript><style>{".stats-countup { display: none !important; }"}</style></noscript>
      <div className="mx-auto max-w-6xl px-5 pb-5 pt-10">
        <dl ref={numbersRef} className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="min-w-0">
              <dt className="sr-only">{stat.label}{stat.illustrative ? " — illustrative demo figure" : ""}</dt>
              <dd className="font-serif whitespace-nowrap text-[1.85rem] tabular-nums sm:text-4xl">
                <span className="sr-only">{formattedValue(stat, 1)}{stat.suffix}</span>
                <span aria-hidden="true" className="stats-countup" data-stat={stat.id}>
                  <span>{formattedValue(stat, progress)}</span>
                  <span className={stat.suffix.startsWith(" ") ? "text-[0.72em]" : ""}>{stat.suffix}</span>
                  {stat.illustrative ? <sup className="ml-1 align-super font-sans text-xs text-gold-deep">*</sup> : null}
                </span>
                <noscript>
                  <span aria-hidden="true" data-static-stat={stat.id}>
                    {formattedValue(stat, 1)}{stat.suffix}{stat.illustrative ? "*" : ""}
                  </span>
                </noscript>
              </dd>
              <dd aria-hidden="true" className="mt-1 text-sm text-ink-soft">{stat.label}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-7 border-t border-ink/8 pt-3 text-xs leading-relaxed text-ink-soft">
          * Reader count and rating are illustrative demo figures, not verified customer data.
        </p>
      </div>
    </section>
  );
}
