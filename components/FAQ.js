'use client';

import { useState } from 'react';

const faqData = [
  {
    question: 'What do you mean by \u201Cfully custom\u201D?',
    answer: 'We mean it literally. We don\u2019t have a catalog of designs you pick from. We don\u2019t add your name to a template. Our design team creates original artwork based on your specific theme, then we manufacture every piece from scratch on premium blanks. You get merch that\u2019s never existed before and will never exist again. It\u2019s yours.',
  },
  {
    question: 'What\u2019s the minimum order?',
    answer: 'Most items start at 24 pieces per design. Since every piece is manufactured from scratch (not pulled from inventory), minimums help us maintain quality and keep pricing reasonable. Planning a smaller party? Reach out \u2014 we\u2019ll see what we can do.',
  },
  {
    question: 'How long does it take?',
    answer: 'Standard delivery is 6-8 weeks from design approval. Because we manufacture everything from scratch on premium blanks, we need time to do it right. Need it faster? Rush production may be available for an additional fee \u2014 just ask.',
  },
  {
    question: 'Why 6-8 weeks?',
    answer: 'Because we don\u2019t cut corners. Every design is created from scratch by our team \u2014 not pulled from a template library. Every piece is manufactured on premium blanks with professional-grade production. That takes time. The result is merch that looks and feels like it came from a real brand, not a rush job. Trust us \u2014 it\u2019s worth the wait.',
  },
  {
    question: 'Can you match our theme/colors?',
    answer: 'Absolutely \u2014 and we go way beyond color matching. Send us your mood board, your venue photos, your invite design, whatever you\u2019ve got. Our team will create custom artwork that ties everything together. We\u2019re not just matching colors; we\u2019re designing merch that feels like part of your event.',
  },
  {
    question: 'Do you design the graphics or do we provide them?',
    answer: 'We design everything. That\u2019s what makes us different. You share your vision, and our design team \u2014 who actually understands what teens think is cool right now \u2014 creates original artwork from scratch. You can send inspo, logos, or ideas, but you don\u2019t need to show up with finished designs. That\u2019s our job.',
  },
  {
    question: 'What\u2019s the quality like?',
    answer: 'We manufacture on premium blanks from brands like Bella+Canvas, Independent Trading Co., and Champion \u2014 the same quality you\u2019d find at high-end retailers. But here\u2019s the difference: we\u2019re not just printing on them. We manufacture everything from scratch with professional-grade techniques, so the finished product looks and feels like legitimate branded merch, not party favors.',
  },
  {
    question: 'What if we need to change sizes after ordering?',
    answer: 'We get it \u2014 teens grow. Contact us ASAP and we\u2019ll do our best to accommodate changes before production starts.',
  },
  {
    question: 'Do you ship to venues?',
    answer: 'Yes! We can ship directly to your event venue, your home, or split shipments however you need.',
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-list">
      {faqData.map((item, index) => (
        <div
          key={index}
          className={`faq-item scroll-reveal${activeIndex === index ? ' active' : ''}`}
          data-delay={index}
        >
          <button className="faq-question" onClick={() => toggleItem(index)}>
            <span>{item.question}</span>
            <span className="faq-icon"></span>
          </button>
          <div className="faq-answer">
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
