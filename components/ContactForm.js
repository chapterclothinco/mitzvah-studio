'use client';

export default function ContactForm() {
  return (
    <form className="contact-form scroll-reveal" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input type="email" id="email" name="email" required />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" name="phone" />
        </div>
        <div className="form-group">
          <label htmlFor="event-date">Event Date</label>
          <input type="date" id="event-date" name="event_date" />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="guest-count">Estimated Guest Count</label>
        <select id="guest-count" name="guest_count" defaultValue="">
          <option value="">Select...</option>
          <option value="under-50">Under 50</option>
          <option value="50-100">50-100</option>
          <option value="100-150">100-150</option>
          <option value="150-200">150-200</option>
          <option value="200+">200+</option>
        </select>
      </div>
      <div className="form-group">
        <label>What products are you interested in?</label>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input type="checkbox" name="products[]" value="hoodies" />
            <span className="checkmark"></span>
            <span>Hoodies &amp; Sweatshirts</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" name="products[]" value="tees" />
            <span className="checkmark"></span>
            <span>Tees &amp; Tanks</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" name="products[]" value="hats" />
            <span className="checkmark"></span>
            <span>Hats &amp; Caps</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" name="products[]" value="bags" />
            <span className="checkmark"></span>
            <span>Bags &amp; Accessories</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" name="products[]" value="extras" />
            <span className="checkmark"></span>
            <span>Party Extras</span>
          </label>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="theme">Tell us about your theme/vision</label>
        <textarea id="theme" name="theme" rows="4" placeholder="Describe your party theme, colors, style, or any ideas you have..."></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="referral">How did you hear about us?</label>
        <select id="referral" name="referral" defaultValue="">
          <option value="">Select...</option>
          <option value="google">Google Search</option>
          <option value="instagram">Instagram</option>
          <option value="referral">Friend/Family Referral</option>
          <option value="event-planner">Event Planner</option>
          <option value="stitched">Stitched Website</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary btn-glow btn-submit">
        <span>Start Your Project</span>
        <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
      <p className="form-note">Standard delivery: 6-8 weeks from design approval</p>
      <p className="form-note">or email us at <a href="mailto:hello@themitzvahstudio.com">hello@themitzvahstudio.com</a></p>
    </form>
  );
}
