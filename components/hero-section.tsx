/* eslint-disable @next/next/no-html-link-for-pages -- Full document navigation is intentional for the static Pages export. */

import {
  ArrowRight,
  BookOpen,
  BookOpenCheck
} from "lucide-react";

const studyActions = [
  {
    title: "Introduction",
    href: "/background/",
    description: "Explore Thessalonica, Paul's brief and contested mission, the young church, and the setting of both letters.",
    icon: BookOpenCheck
  },
  {
    title: "1 Thessalonians",
    href: "/1-thessalonians/1/",
    description: "Read the five-chapter study of faith at work, love that labors, holiness, the hope of resurrection, and watchful readiness.",
    icon: BookOpen
  },
  {
    title: "2 Thessalonians",
    href: "/2-thessalonians/1/",
    description: "Read the three-chapter study of God's just judgment, the coming apostasy, steadfast truth, and faithful work.",
    icon: BookOpen
  }
] as const;

const bookPlans = [
  {
    id: "1-thessalonians",
    slug: "1-thessalonians",
    eyebrow: "First Letter · Five Chapters",
    title: "1 Thessalonians",
    chapterCount: 5
  },
  {
    id: "2-thessalonians",
    slug: "2-thessalonians",
    eyebrow: "Second Letter · Three Chapters",
    title: "2 Thessalonians",
    chapterCount: 3
  }
] as const;

export function HeroSection() {
  return (
    <section className="home-showcase">
      <div className="home-showcase-shell">
        <section className="home-showcase-hero" aria-labelledby="home-title">
          <div className="home-showcase-copy">
            <p className="home-title-prefix">The Epistles to the</p>
            <h1 id="home-title">Thessalonians</h1>
            <p className="home-showcase-description">
              {"Enter Paul's letters to a young, persecuted church, where faith, love, and hope hold steady under pressure and the promise of Christ's return shapes holy, watchful, and diligent living."}
            </p>
            <div className="home-showcase-actions">
              <a href="/1-thessalonians/1/" className="home-showcase-primary">
                Explore 1 Thessalonians
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/2-thessalonians/1/" className="home-showcase-secondary">
                Explore 2 Thessalonians
              </a>
              <a href="/background/" className="home-showcase-secondary">
                Read the Introduction
              </a>
            </div>
          </div>
        </section>

        <section className="home-action-grid" aria-label="Primary study paths">
          {studyActions.map((action) => {
            const Icon = action.icon;
            return (
              <a key={action.href} href={action.href} className="home-action-card">
                <span className="home-action-icon">
                  <Icon className="h-5 w-5" />
                </span>
                <strong>{action.title}</strong>
                <span>{action.description}</span>
                <em>
                  Open
                  <ArrowRight className="h-4 w-4" />
                </em>
              </a>
            );
          })}
        </section>

        <section className="home-chapter-study" aria-labelledby="home-chapter-title">
          <div className="home-section-split">
            <div>
              <p className="home-section-kicker">Two-Book Study</p>
              <h2 id="home-chapter-title">{"Choose a letter and follow Paul's pastoral encouragement."}</h2>
            </div>
            <p id="content-status">
              The complete 8-chapter reader places Scripture on the left and verse-by-verse
              exposition, historical context, and selected word studies on the right.
            </p>
          </div>

          <div className="home-chapter-group-grid">
            {bookPlans.map((book) => (
              <article key={book.id} id={book.id} className="home-chapter-group">
                <BookOpen className="home-chapter-group-icon h-6 w-6" />
                <p>{book.eyebrow}</p>
                <h3>{book.title}</h3>
                <div className="home-chapter-mini-grid">
                  {Array.from({ length: book.chapterCount }, (_, index) => index + 1).map((chapterNumber) => (
                    <a key={chapterNumber} href={`/${book.slug}/${chapterNumber}/`} aria-label={`${book.title} chapter ${chapterNumber}`}>
                      <span>{book.title}</span>
                      <strong>Chapter {chapterNumber}</strong>
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
