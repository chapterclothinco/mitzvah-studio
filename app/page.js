import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <span className="pre-headline animate-in">
              <span className="sparkle">&#10022;</span>
              FULLY CUSTOM BAR &amp; BAT MITZVAH MERCH
              <span className="sparkle">&#10022;</span>
            </span>
            <h1 className="hero-title animate-in delay-1">
              Mitzvah Merch That Actually <span className="gradient-text animated-gradient">Slaps</span>
            </h1>
            <p className="hero-subtitle animate-in delay-2">
              Forget generic party favors. We design and manufacture fully custom hoodies, tees, hats, and more &mdash; created from scratch to match your vision. No templates. No limits. Just merch your guests will fight over.
            </p>
            <div className="hero-ctas animate-in delay-3">
              <a href="#contact" className="btn btn-primary btn-glow">
                <span>Start Your Project</span>
                <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#process" className="btn btn-secondary">
                <span>See How It Works</span>
              </a>
            </div>
          </div>
          <div className="hero-visual animate-in delay-2">
            <div className="hero-image-wrapper">
              <div className="hero-image-placeholder">
                <div className="placeholder-box">
                  <img src="/assets/Submark.svg" alt="" className="placeholder-logo" />
                  <span>Product photos coming soon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-bg-gradient"></div>
        <div className="hero-bg-gradient-2"></div>
      </section>

      {/* Marquee Section */}
      <div className="marquee-section">
        <div className="marquee">
          <div className="marquee-content">
            <span>Fully Custom</span>
            <span className="marquee-dot">&#10022;</span>
            <span>Trend-Forward</span>
            <span className="marquee-dot">&#10022;</span>
            <span>Premium Blanks</span>
            <span className="marquee-dot">&#10022;</span>
            <span>Limitless Options</span>
            <span className="marquee-dot">&#10022;</span>
            <span>Designed For You</span>
            <span className="marquee-dot">&#10022;</span>
            <span>Fully Custom</span>
            <span className="marquee-dot">&#10022;</span>
            <span>Trend-Forward</span>
            <span className="marquee-dot">&#10022;</span>
            <span>Premium Blanks</span>
            <span className="marquee-dot">&#10022;</span>
            <span>Limitless Options</span>
            <span className="marquee-dot">&#10022;</span>
            <span>Designed For You</span>
            <span className="marquee-dot">&#10022;</span>
          </div>
        </div>
      </div>

      {/* What We Make Section */}
      <section id="shop" className="products">
        <div className="container">
          <div className="section-header scroll-reveal">
            <span className="section-tag">What We Create</span>
            <h2>Fully Custom Merch for an <span className="gradient-text">Epic Mitzvah</span></h2>
            <p className="section-subtitle">We don&apos;t slap logos on blanks. Our design team creates original artwork tailored to your theme, then manufactures every piece from scratch on premium blanks. The result? One-of-a-kind merch that looks like it came from a real brand &mdash; because it did. Yours.</p>
          </div>
          <div className="product-grid">
            <div className="product-card scroll-reveal" data-delay="0">
              <div className="product-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 6h16M4 6v12a2 2 0 002 2h12a2 2 0 002-2V6M4 6l2-4h12l2 4" />
                  <path d="M9 10v4M15 10v4" />
                </svg>
              </div>
              <h3>Hoodies &amp; Sweatshirts</h3>
              <ul>
                <li>Pullover hoodies</li>
                <li>Zip-ups</li>
                <li>Crewneck sweatshirts</li>
              </ul>
              <p className="product-custom">Fully customizable &mdash; cuts, colors, graphics, placements. Manufactured on premium heavyweight blanks.</p>
              <p className="perfect-for">Perfect for: Party favors, dance crews, family</p>
            </div>
            <div className="product-card scroll-reveal" data-delay="1">
              <div className="product-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 3h12l2 4v14a1 1 0 01-1 1H5a1 1 0 01-1-1V7l2-4z" />
                  <path d="M8 10a4 4 0 008 0" />
                </svg>
              </div>
              <h3>Tees &amp; Tanks</h3>
              <ul>
                <li>Classic tees</li>
                <li>Cropped tees</li>
                <li>Tank tops</li>
              </ul>
              <p className="product-custom">Your design, your colors, your fit. All made to order with unlimited print locations.</p>
              <p className="perfect-for">Perfect for: Guest giveaways, event staff, photo ops</p>
            </div>
            <div className="product-card scroll-reveal" data-delay="2">
              <div className="product-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 14h18v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4z" />
                  <path d="M3 14l2-8h14l2 8" />
                  <path d="M7 6l1-4h8l1 4" />
                </svg>
              </div>
              <h3>Hats &amp; Caps</h3>
              <ul>
                <li>Dad hats</li>
                <li>Snapbacks</li>
                <li>Beanies</li>
              </ul>
              <p className="product-custom">Embroidered, printed, patches, or all three. Custom headwear that matches your theme exactly.</p>
              <p className="perfect-for">Perfect for: Swag bags, party favors</p>
            </div>
            <div className="product-card scroll-reveal" data-delay="3">
              <div className="product-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </div>
              <h3>Bags &amp; Accessories</h3>
              <ul>
                <li>Tote bags</li>
                <li>Backpacks</li>
                <li>Fanny packs</li>
              </ul>
              <p className="product-custom">Manufactured to your specs. Match your colors, add your logo, make it yours.</p>
              <p className="perfect-for">Perfect for: Welcome bags, guest gifts</p>
            </div>
            <div className="product-card scroll-reveal" data-delay="4">
              <div className="product-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3>Party Extras</h3>
              <ul>
                <li>Socks</li>
                <li>Bandanas</li>
                <li>Wristbands</li>
              </ul>
              <p className="product-custom">Fully custom down to the last detail. Because the details matter.</p>
              <p className="perfect-for">Perfect for: Swag table extras</p>
            </div>
          </div>
          <p className="products-footer scroll-reveal">Don&apos;t see what you&apos;re imagining? That&apos;s the point. We manufacture everything from scratch &mdash; if you can dream it, we can create it. <a href="#contact">No limits.</a></p>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="process" className="process">
        <div className="container">
          <div className="section-header scroll-reveal">
            <span className="section-tag">How It Works</span>
            <h2>From Your Vision to Your Party in <span className="gradient-text">3 Steps</span></h2>
          </div>
          <div className="steps">
            <div className="step scroll-reveal" data-delay="0">
              <div className="step-number"><span>1</span></div>
              <h3>Share Your Vision</h3>
              <p>Tell us about your theme, vibe, colors &mdash; or just send a Pinterest board. Our design team lives and breathes teen trends, so even if you&apos;re starting from zero, we&apos;ve got you.</p>
            </div>
            <div className="step-connector scroll-reveal" data-delay="1">
              <svg viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 10 Q 50 10 100 10" stroke="url(#connector-gradient)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                <defs>
                  <linearGradient id="connector-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#2563EB' }} />
                    <stop offset="100%" style={{ stopColor: '#EC4899' }} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="step scroll-reveal" data-delay="2">
              <div className="step-number"><span>2</span></div>
              <h3>We Design, You Approve</h3>
              <p>This isn&apos;t template customization. Our designers create original artwork tailored to your Mitzvah. We&apos;ll send mockups, you give feedback, we refine until it&apos;s exactly right.</p>
            </div>
            <div className="step-connector scroll-reveal" data-delay="3">
              <svg viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 10 Q 50 10 100 10" stroke="url(#connector-gradient)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
              </svg>
            </div>
            <div className="step scroll-reveal" data-delay="4">
              <div className="step-number"><span>3</span></div>
              <h3>We Manufacture &amp; Deliver</h3>
              <p>Every piece is manufactured from scratch on premium blanks &mdash; not decorated after the fact. Quality you can feel, delivered to your door (or venue) ready to make an impression.</p>
            </div>
          </div>
          <div className="process-footer scroll-reveal">
            <a href="#contact" className="btn btn-primary btn-glow">
              <span>Get Started</span>
              <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <p className="timeline-note">Standard delivery: 6-8 weeks. Rush options available &mdash; ask us.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq">
        <div className="container">
          <div className="section-header scroll-reveal">
            <span className="section-tag">FAQ</span>
            <h2>Got <span className="gradient-text">Questions?</span></h2>
          </div>
          <FAQ />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header scroll-reveal">
            <span className="section-tag">Get Started</span>
            <h2>Ready for Merch That&apos;s Actually <span className="gradient-text animated-gradient">Custom?</span></h2>
            <p className="section-subtitle">No templates. No generic designs. Just fully custom pieces created from scratch by a team that knows what&apos;s trending. Let&apos;s make something your guests have never seen before.</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
