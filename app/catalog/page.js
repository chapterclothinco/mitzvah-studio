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
        </div>

        <CatalogGrid />

        <div className="catalog-cta-section">
          <div className="catalog-cta-inner">
            <span className="section-tag">100% Custom</span>
            <h2>We make <span className="gradient-text">anything</span> you want.</h2>
            <p>This is just what&apos;s popular. If you have something else in mind &mdash; a jersey, a bucket hat, matching pajama sets, literally anything &mdash; we&apos;ll design it from scratch and manufacture it for you.</p>
            <Link href="/#contact" className="btn btn-primary btn-glow">
              <span>Start Your Project</span>
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
