import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

import logo from './assets/images/icons/logo.svg';
import ideaIcon from './assets/icons/idea-01.png';
import heroBg from './assets/images/pictures/3.jpeg';
import remnantsRebornImg from './assets/images/pictures/remnants-reborn-hero.jpg';
import whoWeAreImg from './assets/images/pictures/2.jpeg';
import truthDisciplineImg from './assets/images/pictures/9.jpeg';
import whatWeDoImg1 from './assets/images/pictures/8.jpeg';
import whatWeDoImg2 from './assets/images/pictures/4.jpeg';
import whatWeDoImg3 from './assets/images/pictures/5.jpeg';
import whatWeDoImg4 from './assets/images/pictures/6.jpeg';
import whatWeDoImg5 from './assets/images/pictures/7.jpeg';
import aboutImg12 from './assets/images/pictures/12.png';
import aboutImg13 from './assets/images/pictures/13.png';
import aboutImg14 from './assets/images/pictures/14.png';
import aboutImg15 from './assets/images/pictures/15.png';

const WHATSAPP_LINK = 'https://chat.whatsapp.com/CyPJlBlV4JhCxMstJAOIrq?mode=gi_t';

const HERO_SLIDES = [
  {
    title: 'A Generation Aligned for Impact',
    sub: 'Kairos Summit is a Christian movement raising believers who are spiritually grounded, culturally aware, and boldly influential in every sphere of life.',
  },
  {
    title: 'Built on Truth and Discipline',
    sub: 'We equip Christians to live out their faith with conviction in leadership, creativity, career, media, and everyday life.',
  },
  {
    title: 'Your Kairos Moment Awaits',
    sub: 'We believe this generation is not late, lost, or forgotten. This is a formation space for depth, clarity, and responsibility.',
  },
];

const RAINBOW_CARDS = [
  { img: remnantsRebornImg, title: 'Remnants Reborn.', date: 'November 15' },
  { img: truthDisciplineImg, title: 'Truth & Discipline.', date: 'December 3' },
  { img: whatWeDoImg3, title: 'Community & Growth.', date: 'December 20' },
  { img: whoWeAreImg, title: 'Who We Are.', date: 'January 12' },
  { img: whatWeDoImg1, title: 'Formation Gathering.', date: 'February 8' },
  { img: whatWeDoImg2, title: 'Kairos Summit 2026.', date: 'March 20' },
];

const SEMICIRCLE_RADIUS = 480;
const SEMICIRCLE_CX = 500;
const SEMICIRCLE_CY = 380;
function getSemicirclePosition(slotIndex, totalSlots) {
  const step = 180 / Math.max(1, totalSlots - 1);
  const angleDeg = 180 - slotIndex * step;
  const angleRad = (angleDeg * Math.PI) / 180;
  const x = SEMICIRCLE_CX + SEMICIRCLE_RADIUS * Math.cos(angleRad);
  const y = SEMICIRCLE_CY - SEMICIRCLE_RADIUS * Math.sin(angleRad);
  return { x, y };
}

const SLOT_LEFT_OFFSETS = [-270, -100, -50, -25, 70, 250];
const SLOT_TOP_OFFSETS = [-25, 45, 115, 115, 45, -55];

function NavBar() {
  return (
    <>
      <nav className="nav">
        <NavLink to="/" className="nav__brand" aria-label="Kairos Summit home">
          <img src={logo} alt="Kairos Summit" className="nav__logo-icon" />
        </NavLink>
        <ul className="nav__links">
          <li>
            <NavLink to="/" end className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}>About</NavLink>
          </li>
          <li><a href="/#team" className="nav__link">Team/Contact</a></li>
          <li><a href="/#blog" className="nav__link">Blog</a></li>
        </ul>
      </nav>
      <a href={WHATSAPP_LINK} className="nav-cta btn btn--primary" target="_blank" rel="noopener noreferrer">Join our community</a>
    </>
  );
}

function AboutPage() {
  return (
    <div className="landing about-page">
      <NavBar />
      <main className="about-main">
        <section className="about-hero section section--white">
          <div className="about-hero__grid">
            <div className="about-hero__left">
              <h1 className="about-hero__headline">
                New to <span className="highlight-gold">Kairos?</span><br />Here&apos;s Our Story
              </h1>
              <span className="about-pill">
                <span className="about-pill__dot" aria-hidden />
                Our Story
              </span>
            </div>
            <div className="about-hero__right">
              <p className="about-hero__text">
                Kairos Summit was birthed from a conviction that this generation has a divine assignment. The word Kairos represents a divinely appointed time, a moment of alignment and purpose. We believe this generation has been positioned intentionally by God to influence culture, lead with integrity, and live with clarity. Kairos Summit exists to prepare believers for that assignment.
              </p>
              <div className="about-hero__ctas">
                <a href={WHATSAPP_LINK} className="btn btn--primary" target="_blank" rel="noopener noreferrer">Join our community</a>
                <a href="/#what-we-do" className="btn btn--gold">Learn more <img src={ideaIcon} alt="" className="btn__icon btn__icon--bulb" width={20} height={20} aria-hidden /></a>
              </div>
            </div>
          </div>
        </section>
        <section className="about-gallery section section--white">
          <div className="about-gallery__grid">
            <div className="about-gallery__slot about-gallery__slot--top-left">
              <img src={aboutImg12} alt="Kairos Summit panel" />
            </div>
            <div className="about-gallery__slot about-gallery__slot--narrow">
              <img src={aboutImg15} alt="Speaker at Kairos Summit" />
            </div>
            <div className="about-gallery__slot about-gallery__slot--right">
              <img src={aboutImg14} alt="Registration at Kairos Summit 2024" />
            </div>
            <div className="about-gallery__slot about-gallery__slot--bottom-left">
              <img src={aboutImg13} alt="Attendees at Kairos Summit" />
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="footer__logo">
              <img src={logo} alt="Kairos Summit" className="footer__logo-icon" />
            </div>
            <div className="footer__social">
              <a href="https://x.com/kairos_summit?s=21" className="footer__social-link" target="_blank" rel="noopener noreferrer">X</a>
              <a href="https://www.instagram.com/kairos_summit/" className="footer__social-link" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://youtube.com/@kairossummit-official?si=UQE7oG1sz0M8105R" className="footer__social-link" target="_blank" rel="noopener noreferrer">Youtube</a>
              <a href="https://www.facebook.com/share/1FX2cBR5Df/" className="footer__social-link" target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
          </div>
          <div className="footer__copy">
            <p className="footer__tagline">A gathering centered on revival with responsibility.</p>
            <p className="footer__tagline">Restoring believers to clarity of identity, depth of faith, and courage of expression.</p>
            <a href={WHATSAPP_LINK} className="footer__cta" target="_blank" rel="noopener noreferrer">Join the Community</a>
          </div>
        </div>
        <div className="footer__separator" aria-hidden />
      </footer>
    </div>
  );
}

function App() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [rainbowCardIndex, setRainbowCardIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setHeroSlide((i) => (i + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <Routes>
      <Route path="/about" element={<AboutPage />} />
      <Route path="/" element={
    <div className="landing">
      <NavBar />

      {/* ----- HERO ----- */}
      <section className="hero" id="home">
        <div className="hero__bg" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="hero__overlay" aria-hidden />
        <div className="hero__content-wrap">
          <div className="hero__slide-indicator" aria-hidden>
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`hero__indicator-dot ${i === heroSlide ? 'hero__indicator-dot--active' : ''}`}
                onClick={() => setHeroSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === heroSlide ? 'true' : undefined}
              />
            ))}
          </div>
          <div className="hero__content">
            <div key={heroSlide} className="hero__slide">
              <h1 className="hero__title">{HERO_SLIDES[heroSlide].title}</h1>
              <p className="hero__sub">{HERO_SLIDES[heroSlide].sub}</p>
            </div>
          </div>
        </div>
        <div className="hero__cta">
          <a href="https://chat.whatsapp.com/CyPJlBlV4JhCxMstJAOIrq?mode=gi_t" className="btn btn--primary" target="_blank" rel="noopener noreferrer">Join our community</a>
          <a href="/about" className="btn btn--gold">Learn more <img src={ideaIcon} alt="" className="btn__icon btn__icon--bulb" width={20} height={20} aria-hidden /></a>
        </div>
        <div className="hero__event-box">
          <div className="hero__event-media">
            <img src={remnantsRebornImg} alt="Remnants Reborn" className="hero__event-thumb" />
          </div>
          <div className="hero__event-text">
            <p className="hero__event-title">
            <span className="hero__event-label">Upcoming Major event :</span>{' '}
            <span className="hero__event-name">Remnants Reborn</span>
          </p>
            <p className="hero__event-meta">November 15th 2026 in Port Harcourt,</p>
          </div>
        </div>
      </section>

      {/* ----- WHO WE ARE ----- */}
      <section className="section section--white" id="about">
        <div className="about-header">
          <span className="tag">Who we are</span>
        </div>
        <div className="section__grid section__grid--image-left">
          <div className="section__media-wrap">
            <h2 className="section__title section__title--above-media">A Movement, Not Just a Moment</h2>
            <div className="section__media section__media--who-we-are">
            <div className="who-we-are-stack">
              <div className="who-we-are-stack__rect" style={{ backgroundColor: '#550E1E' }} aria-hidden />
              <div className="who-we-are-stack__img-wrap">
                <img src={whoWeAreImg} alt="Kairos Summit 2024 Port Harcourt" />
              </div>
            </div>
          </div>
          </div>
          <div className="section__body">
            <h3 className="section__subtitle">New to <span className="highlight-gold">Kairos</span>?<br />Here's who we are.</h3>
            <p className="section__text">
              Kairos Summit is more than a gathering. It is a formation space for believers who desire depth, clarity, and responsibility in their walk with God. We equip Christians to live out their faith with conviction in leadership, creativity, career, media, and everyday life. We believe this generation is not late, lost, or forgotten. We believe this is a Kairos moment.
            </p>
            <a href="https://chat.whatsapp.com/CyPJlBlV4JhCxMstJAOIrq?mode=gi_t" className="link-arrow" target="_blank" rel="noopener noreferrer">Join the Community <span className="link-arrow__icon" aria-hidden>→</span></a>
          </div>
        </div>
      </section>

      {/* ----- BUILT ON TRUTH ----- */}
      <section className="section section--white" id="truth">
        <div className="section__grid section__grid--image-right">
          <div className="section__body">
            <h3 className="section__subtitle">Just discovering <span className="highlight-gold">Kairos</span>? Here's what defines us.</h3>
            <ul className="values-list">
              <li>
                <span className="values-list__title">Character before Influence</span>
                <span className="values-list__desc">We build people before platforms.</span>
              </li>
              <li>
                <span className="values-list__title">Faith with Structure</span>
                <span className="values-list__desc">We move beyond vibes into disciplined spiritual growth.</span>
              </li>
              <li>
                <span className="values-list__title">Influence with Conviction</span>
                <span className="values-list__desc">We engage culture without diluting truth.</span>
              </li>
            </ul>
            <a href="#about" className="link-arrow">Learn more <span className="link-arrow__icon" aria-hidden>→</span></a>
          </div>
          <div className="section__media-wrap">
            <h2 className="section__title section__title--above-media">Built on Truth and Discipline</h2>
            <div className="section__media section__media--who-we-are">
              <div className="who-we-are-stack">
                <div className="who-we-are-stack__rect" style={{ backgroundColor: '#FABD21' }} aria-hidden />
                <div className="who-we-are-stack__img-wrap">
                  <img src={truthDisciplineImg} alt="Kairos Summit 2024 Business Summit" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----- WHAT WE DO ----- */}
      <section className="section section--white" id="what-we-do">
        <span className="tag">What we do</span>
        <h2 className="section__title what-we-do__title">
          So what happens <span className="highlight-gold">here?</span> Here's what we do.
        </h2>
        <p className="what-we-do__subtitle">
          Through gatherings, teachings, and community, Kairos Summit helps believers:
        </p>
        <div className="what-we-do__grid">
          <div className="what-we-do__card what-we-do__card--large">
            <img src={whatWeDoImg1} alt="" />
            <span className="what-we-do__card-label">Understand identity in Christ</span>
          </div>
          <div className="what-we-do__cards">
            <div className="what-we-do__card">
              <img src={whatWeDoImg2} alt="" />
              <span className="what-we-do__card-label">Develop discipline and spiritual maturity</span>
            </div>
            <div className="what-we-do__card">
              <img src={whatWeDoImg3} alt="" />
              <span className="what-we-do__card-label">Engage culture with wisdom</span>
            </div>
            <div className="what-we-do__card">
              <img src={whatWeDoImg4} alt="" />
              <span className="what-we-do__card-label">Build leadership capacity</span>
            </div>
            <div className="what-we-do__card">
              <img src={whatWeDoImg5} alt="" />
              <span className="what-we-do__card-label">Grow in faith and community</span>
            </div>
          </div>
        </div>
      </section>

      {/* ----- NEWS + CAROUSEL + JOIN MOVEMENT ----- */}
      <section className="section section--white" id="news">
        <span className="tag">News</span>
        <h2 className="section__title news__title">
          News at <span className="highlight-gold">Kairos</span>? We're ready to help!
        </h2>
        <p className="news__subtitle">
          Through gatherings, teachings, and community, Kairos Summit helps believers:
        </p>
        <a href="#what-we-do" className="news__link">Learn more <span className="link-arrow__icon" aria-hidden>→</span></a>
      </section>

      {/* Rainbow + event card in arc + Join the Movement under the arc */}
      <section className="rainbow-section" id="community">
        <div className="rainbow">
          <div className="rainbow__strand" aria-hidden="true" />
        </div>
        <div className="rainbow-section__card-wrap">
          <div className="rainbow-section__cards" role="list">
            {RAINBOW_CARDS.map((card, i) => {
              const n = RAINBOW_CARDS.length;
              const slot = (i - rainbowCardIndex + 2 + n) % n;
              const { x, y } = getSemicirclePosition(slot, n);
              const leftOffset = SLOT_LEFT_OFFSETS[slot] ?? 0;
              const topOffset = SLOT_TOP_OFFSETS[slot] ?? 0;
              return (
                <div
                  key={i}
                  role="listitem"
                  className={`rainbow-section__card ${i === rainbowCardIndex ? 'rainbow-section__card--active' : ''}`}
                  onClick={() => setRainbowCardIndex(i)}
                  style={{
                    left: `${x + leftOffset}px`,
                    top: `${y + topOffset}px`,
                  }}
                >
                  <div className="rainbow-section__card-img-card">
                    <img src={card.img} alt="" className="rainbow-section__card-img" />
                  </div>
                  <div className="rainbow-section__card-copy">
                    <h3 className="rainbow-section__card-title">{card.title}</h3>
                    <span className="rainbow-section__card-date">{card.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="rainbow-section__card-dots" aria-hidden>
            {RAINBOW_CARDS.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`rainbow-section__card-dot ${i === rainbowCardIndex ? 'rainbow-section__card-dot--active' : ''}`}
                onClick={() => setRainbowCardIndex(i)}
                aria-label={`Select card ${i + 1}`}
                aria-current={i === rainbowCardIndex ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
        <div className="rainbow-section__content">
          <span className="tag tag--muted">Hero section</span>
          <h2 className="section__title join-movement__title">
            Join the <span className="highlight-gold">Movement</span>
          </h2>
          <p className="join-movement__subtitle">
            You are not called to passive faith. You are called to intentional impact.
          </p>
          <a href="https://chat.whatsapp.com/CyPJlBlV4JhCxMstJAOIrq?mode=gi_t" className="news__link join-movement__link" target="_blank" rel="noopener noreferrer">Join the Community <span className="link-arrow__icon" aria-hidden>→</span></a>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="footer__logo">
              <img src={logo} alt="Kairos Summit" className="footer__logo-icon" />
            </div>
            <div className="footer__social">
              <a href="https://x.com/kairos_summit?s=21" className="footer__social-link" target="_blank" rel="noopener noreferrer">X</a>
              <a href="https://www.instagram.com/kairos_summit/" className="footer__social-link" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://youtube.com/@kairossummit-official?si=UQE7oG1sz0M8105R" className="footer__social-link" target="_blank" rel="noopener noreferrer">Youtube</a>
              <a href="https://www.facebook.com/share/1FX2cBR5Df/" className="footer__social-link" target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
          </div>
          <div className="footer__copy">
            <p className="footer__tagline">
              A gathering centered on revival with responsibility.
            </p>
            <p className="footer__tagline">
              Restoring believers to clarity of identity, depth of faith, and courage of expression.
            </p>
            <a href="https://chat.whatsapp.com/CyPJlBlV4JhCxMstJAOIrq?mode=gi_t" className="footer__cta" target="_blank" rel="noopener noreferrer">Join the Community</a>
          </div>
        </div>
        <div className="footer__separator" aria-hidden />
      </footer>
    </div>
      } />
    </Routes>
  );
}

export default App;
