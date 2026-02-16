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
          <h2>Our <span className="gradient-text">Best Sellers</span></h2>
          <p className="section-subtitle">Our top picks &mdash; but this just scratches the surface. We design and manufacture everything from scratch, so whatever you&apos;re imagining, we can make it happen.</p>
          <p className="catalog-sizing">All items available in sizes <strong>4XS&ndash;4XL</strong></p>
        </div>

        <CatalogGrid />

        <div className="catalog-cta-section">
          <div className="catalog-cta-inner">
            <h2>Don&apos;t see it? <span className="gradient-text">We&apos;ll build it.</span></h2>
            <p>Jerseys, bucket hats, matching sets, robes &mdash; you name it. Every single thing we make is designed from scratch and manufactured to order. No templates. No limits. Just tell us what you want.</p>
            <Link href="/#contact" className="btn btn-primary btn-glow">
              <span>Let&apos;s Talk</span>
              <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
