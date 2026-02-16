import CatalogGrid from '@/components/CatalogGrid';
import Link from 'next/link';

export const metadata = {
  title: 'Catalog | The Mitzvah Studio - Custom Merch for Bar & Bat Mitzvahs',
  description: 'Browse our full catalog of fully custom Bar and Bat Mitzvah merch \u2014 hoodies, tees, hats, bags, sleepwear, and more. Every piece designed from scratch.',
};

export default function CatalogPage() {
  return (
    <section className="catalog-page">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Full Catalog</span>
          <h2>Everything We <span className="gradient-text">Create</span></h2>
          <p className="section-subtitle">Every piece is designed from scratch and manufactured on premium blanks. Browse our full range &mdash; if you can dream it, we can make it.</p>
        </div>

        <CatalogGrid />

        <div className="catalog-cta">
          <h3>Don&apos;t see what you&apos;re imagining?</h3>
          <p>That&apos;s the point. We manufacture everything from scratch &mdash; if you can dream it, we can create it.</p>
          <Link href="/#contact" className="btn btn-primary btn-glow">
            <span>Start Your Project</span>
            <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
