import "server-only";

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ChapterContentSchema, type ChapterContent } from "@/lib/schemas";
import { padChapter } from "@/lib/utils";

export const THESSALONIANS_BOOKS = {
  "1-thessalonians": {
    slug: "1-thessalonians",
    name: "1 Thessalonians",
    chapterCount: 5,
    verseCounts: [10, 20, 13, 18, 28]
  },
  "2-thessalonians": {
    slug: "2-thessalonians",
    name: "2 Thessalonians",
    chapterCount: 3,
    verseCounts: [12, 17, 18]
  }
} as const;

export type ThessaloniansBookSlug = keyof typeof THESSALONIANS_BOOKS;
export type ThessaloniansBookConfig = (typeof THESSALONIANS_BOOKS)[ThessaloniansBookSlug];

export type ChapterAdjacency = {
  previous: number | null;
  next: number | null;
};

const contentRoot = join(process.cwd(), "content");

export function getThessaloniansBookConfig(bookSlug: ThessaloniansBookSlug): ThessaloniansBookConfig {
  return THESSALONIANS_BOOKS[bookSlug];
}

export function getThessaloniansStaticParams(bookSlug: ThessaloniansBookSlug) {
  const { chapterCount } = getThessaloniansBookConfig(bookSlug);
  return Array.from({ length: chapterCount }, (_, index) => ({ chapter: String(index + 1) }));
}

export function parseThessaloniansChapterNumber(
  bookSlug: ThessaloniansBookSlug,
  chapter: number | string
): number | null {
  const rawChapter = String(chapter);
  if (!/^[1-9]\d*$/.test(rawChapter)) return null;

  const chapterNumber = Number(rawChapter);
  const { chapterCount } = getThessaloniansBookConfig(bookSlug);
  if (!Number.isSafeInteger(chapterNumber) || chapterNumber > chapterCount) return null;

  return chapterNumber;
}

export function getThessaloniansChapter(
  bookSlug: ThessaloniansBookSlug,
  chapter: number | string
): ChapterContent | null {
  const chapterNumber = parseThessaloniansChapterNumber(bookSlug, chapter);
  if (chapterNumber === null) return null;

  const config = getThessaloniansBookConfig(bookSlug);
  const chapterPath = join(contentRoot, config.slug, `chapter-${padChapter(chapterNumber)}.json`);
  if (!existsSync(chapterPath)) return null;

  const parsed = ChapterContentSchema.parse(JSON.parse(readFileSync(chapterPath, "utf8")));
  const expectedVerseCount = config.verseCounts[chapterNumber - 1];

  if (parsed.chapterNumber !== chapterNumber) {
    throw new Error(
      `${config.name} ${chapterNumber} loaded chapterNumber ${parsed.chapterNumber}.`
    );
  }

  if (parsed.verses.length !== expectedVerseCount) {
    throw new Error(
      `${config.name} ${chapterNumber} has ${parsed.verses.length} verses; expected ${expectedVerseCount}.`
    );
  }

  parsed.verses.forEach((verse, index) => {
    const expectedReference = `${config.name} ${chapterNumber}:${index + 1}`;
    if (verse.verse !== expectedReference) {
      throw new Error(
        `${config.name} ${chapterNumber} contains ${verse.verse}; expected ${expectedReference}.`
      );
    }
  });

  return parsed;
}

export function getThessaloniansChapterAdjacency(
  bookSlug: ThessaloniansBookSlug,
  chapter: number | string
): ChapterAdjacency | null {
  const chapterNumber = parseThessaloniansChapterNumber(bookSlug, chapter);
  if (chapterNumber === null) return null;

  const { chapterCount } = getThessaloniansBookConfig(bookSlug);
  return {
    previous: chapterNumber > 1 ? chapterNumber - 1 : null,
    next: chapterNumber < chapterCount ? chapterNumber + 1 : null
  };
}
