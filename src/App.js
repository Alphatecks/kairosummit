import React, { useState, useEffect } from 'react';
import './App.css';

import logo from './assets/images/icons/logo.svg';
import ideaIcon from './assets/icons/idea-01.png';
import heroBg from './assets/images/pictures/3.jpeg';
import remnantsRebornImg from './assets/images/pictures/remnants-reborn-hero.jpg';
import whoWeAreImg from './assets/images/pictures/2.jpeg';
import truthDisciplineImg from './assets/images/pictures/truth-discipline.png';

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

function App() {
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setHeroSlide((i) => (i + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="landing">
      {/* ----- NAV ----- */}
      <nav className="nav">
        <div className="nav__brand">
          <img src={logo} alt="Kairos Summit" className="nav__logo-icon" />
        </div>
        <ul className="nav__links">
          <li><a href="#home" className="nav__link nav__link--active">Home</a></li>
          <li><a href="#about" className="nav__link">About</a></li>
          <li><a href="#team" className="nav__link">Team/Contact</a></li>
          <li><a href="#blog" className="nav__link">Blog</a></li>
        </ul>
      </nav>
      <a href="#community" className="nav-cta btn btn--primary">Join our community</a>

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
          <a href="#community" className="btn btn--primary">Join our community</a>
          <a href="#about" className="btn btn--gold">Learn more <img src={ideaIcon} alt="" className="btn__icon btn__icon--bulb" width={20} height={20} aria-hidden /></a>
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
            <a href="#community" className="link-arrow">Join the Community <span className="link-arrow__icon" aria-hidden>→</span></a>
          </div>
        </div>
      </section>

      {/* ----- BUILT ON TRUTH ----- */}
      <section className="section section--white">
        <h2 className="section__title section__title--center">Built on Truth and Discipline</h2>
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
          <div className="section__media">
            <img src={truthDisciplineImg} alt="Kairos Summit" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
