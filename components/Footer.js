import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <img src="/assets/Logo.svg" alt="The Mitzvah Studio" className="footer-logo-img" />
            </Link>
            <p className="tagline">Fully custom Mitzvah merch &mdash; designed from scratch, manufactured on premium blanks.</p>
          </div>
          <nav className="footer-nav">
            <a href="/#shop">Shop</a>
            <Link href="/catalog">Catalog</Link>
            <a href="/#process">How It Works</a>
            <a href="/#faq">FAQ</a>
            <a href="/#contact">Contact</a>
          </nav>
          <div className="footer-contact">
            <a href="mailto:hello@themitzvahstudio.com">hello@themitzvahstudio.com</a>
            <a href="https://instagram.com/themitzvahstudio" target="_blank" rel="noopener" className="footer-social">@themitzvahstudio</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 The Mitzvah Studio. All rights reserved.</p>
          <p className="parent-brand">A <a href="https://gostitched.com" target="_blank" rel="noopener">Stitched</a> Brand</p>
        </div>
      </div>
    </footer>
  );
}
