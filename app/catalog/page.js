import CatalogGrid from '@/components/CatalogGrid';
import Link from 'next/link';

export const metadata = {
  title: 'Catalog | The Mitzvah Studio - Custom Merch for Bar & Bat Mitzvahs',
  description: 'Browse our best-selling custom Bar and Bat Mitzvah merch — hoodies, tees, hats, bags, sleepwear, and more. Everything designed from scratch.',
};

export default function CatalogPage() {
  return (
    <section className="catalog-page">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Best Sellers</span>
          <h2>Our Most <span className="gradient-text">Popular</span> Pieces</h2>
          <p className="section-subtitle">These are some of our most-loved products &mdash; but this is just the start. We design and manufacture everything from scratch, so if you don&apos;t see exactly what you&apos;re looking for, just tell us. We&apos;ll make it.</p>
        </div>

        <CatalogGrid />

        <div className="catalog-cta">
          <h3>Don&apos;t see what you need? We&apos;ll create it.</h3>
          <p>Hoodies, jerseys, robes, pajamas, bucket hats, fanny packs &mdash; you name it. Everything we make is designed from scratch and fully custom. If you can dream it, we can manufacture it.</p>
          <Link href="/#contact" className="btn btn-primary btn-glow">
            <span>Tell Us What You Want</span>
            <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
