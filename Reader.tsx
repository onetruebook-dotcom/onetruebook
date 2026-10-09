"use client";

import { useState } from "react";
import type { BookChapter } from "@/db/schema";

export function Reader({ chapters }: { chapters: BookChapter[] }) {
  const [index, setIndex] = useState(0);
  const chapter = chapters[index];
  if (!chapter) return null;

  return (
    <article className="mt-10">
      <p className="text-sm text-ink-soft">
        Chapter {chapter.number} · {chapter.readingMinutes} min read
      </p>
      <h2 className="font-serif mt-2 text-3xl">{chapter.title}</h2>
      {chapter.body.map((paragraph) => (
        <p key={paragraph.slice(0, 32)} className="font-serif mt-6 text-[1.15rem] leading-8">
          {paragraph}
        </p>
      ))}
      {chapters.length > 1 ? (
        <div className="mt-12 flex items-center justify-between border-t border-ink/10 pt-6">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => setIndex((value) => Math.max(0, value - 1))}
            className="text-sm disabled:opacity-30"
          >
            Previous chapter
          </button>
          <span className="text-sm text-ink-soft">
            {index + 1} / {chapters.length}
          </span>
          <button
            type="button"
            disabled={index === chapters.length - 1}
            onClick={() => setIndex((value) => Math.min(chapters.length - 1, value + 1))}
            className="text-sm disabled:opacity-30"
          >
            Next chapter
          </button>
        </div>
      ) : null}
    </article>
  );
}
