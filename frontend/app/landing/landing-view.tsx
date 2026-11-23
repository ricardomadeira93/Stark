import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

import { AnswerExample } from "./answer-example";
import { CONTENT, FEATURE_CODE, type Lang } from "./content";
import { FeatureCard } from "./feature-card";
import "./landing.css";
import { LanguageSelect } from "./language-select";
import { PipelineFlow } from "./pipeline-flow";

const GITHUB = "https://github.com/ricardomadeira93/Stark";
const PORTFOLIO = "https://www.ricardomadeira.dev/";

export function LandingView({ lang }: { lang: Lang }) {
  const t = CONTENT[lang];
  const demoHref = "/dashboard";

  return (
    <div className="sk" lang={t.htmlLang}>
      <header className="sk-nav">
        <div className="sk-wrap sk-nav__inner">
          <span className="sk-brand">Stark</span>
          <nav className="sk-nav__links" aria-label={t.nav.main}>
            <a href="#how">{t.nav.how}</a>
            <a href={GITHUB} target="_blank" rel="noreferrer">
              {t.nav.source}
            </a>
            <LanguageSelect current={lang} label={t.nav.languages} />
            <ThemeToggle />
            <Link href={demoHref} className="sk-btn sk-btn--sm sk-nav__cta">
              {t.nav.demo}
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="sk-wrap sk-hero">
          <div className="sk-hero__text">
            <h1 className="sk-h1">{t.hero.h1}</h1>
            <p className="sk-lede">{t.hero.lede}</p>
            <div className="sk-actions">
              <Link href={demoHref} className="sk-btn">
                {t.hero.demo}
              </Link>
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                className="sk-btn sk-btn--ghost"
              >
                {t.hero.source}
              </a>
            </div>
            <p className="sk-note">
              {t.hero.noteBefore}
              <a href={PORTFOLIO} target="_blank" rel="noreferrer">
                Ricardo Madeira
              </a>
              {t.hero.noteAfter}
            </p>
          </div>
          <div className="sk-hero__demo">
            <AnswerExample t={t.example} />
          </div>
        </section>

        <section id="how" className="sk-section">
          <div className="sk-wrap">
            <h2 className="sk-h2">{t.flow.title}</h2>
            <p className="sk-intro">{t.flow.intro}</p>
            <PipelineFlow t={t.flow} />
          </div>
        </section>

        <section className="sk-section">
          <div className="sk-wrap">
            <h2 className="sk-h2">{t.features.title}</h2>
            <div className="sk-features">
              {t.features.items.map((item, i) => (
                <FeatureCard
                  key={FEATURE_CODE[i].file}
                  index={i}
                  title={item.title}
                  body={item.body}
                  file={FEATURE_CODE[i].file}
                  code={FEATURE_CODE[i].code}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="sk-section sk-close">
          <div className="sk-wrap sk-close__inner">
            <div>
              <h2 className="sk-h2">{t.close.title}</h2>
              <p className="sk-intro">{t.close.body}</p>
            </div>
            <div className="sk-actions">
              <Link href={demoHref} className="sk-btn">
                {t.hero.demo}
              </Link>
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                className="sk-btn sk-btn--ghost"
              >
                {t.hero.source}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="sk-foot">
        <div className="sk-wrap">
          <p>
            {t.footer.before}
            <a href={PORTFOLIO} target="_blank" rel="noreferrer">
              Ricardo Madeira
            </a>
            {t.footer.after}
          </p>
        </div>
      </footer>
    </div>
  );
}
