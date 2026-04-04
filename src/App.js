import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, NavLink, Link, useLocation, useParams } from 'react-router-dom';
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
import whatWeDoImg10 from './assets/images/pictures/10.jpeg';
import aboutImg12 from './assets/images/pictures/12.png';
import aboutImg13 from './assets/images/pictures/13.png';
import aboutImg14 from './assets/images/pictures/14.png';
import aboutImg15 from './assets/images/pictures/15.png';
import convenerImg from './assets/images/pictures/convener.jpeg';
import johnImg from './assets/images/pictures/john.jpg';
import laneImg from './assets/images/pictures/lane.jpeg';
import joyImg from './assets/images/pictures/joy.jpg';
import deeImg from './assets/images/pictures/dee.jpg';
import blessingImg from './assets/images/pictures/blessing.png';
import obasImg from './assets/images/pictures/obas.png';
import blogHeroImg from './assets/images/pictures/DSC_9812.JPG';

const WHATSAPP_LINK = 'https://chat.whatsapp.com/CyPJlBlV4JhCxMstJAOIrq?mode=gi_t';
const BLOG_API_BASE_URL = 'https://blogger-backend-4d6s.onrender.com';
const BLOG_FEED_ENDPOINT = `${BLOG_API_BASE_URL}/api/blogs/feed?page=1&limit=20`;
const BLOG_TOP_HEADER_ENDPOINT = `${BLOG_API_BASE_URL}/api/blogs/top-header`;

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

const TEAM_CONTACT_MEMBERS = [
  { img: johnImg, name: 'John Nnaoma', role: 'Personal Assistant' },
  { img: laneImg, name: 'Lane Onwa', role: 'Administrative Assistant' },
  { img: joyImg, name: 'Joy Oluwasanmi', role: 'Community Manager' },
  { img: deeImg, name: 'Deeshan Nkosi', role: 'Social Media Manager' },
  { img: blessingImg, name: 'Blessing Abosede', role: 'Public Relations' },
  { img: obasImg, name: 'Obas Daniel', role: 'Creative Designer' },
];

const STORY_TEMPLATES = [
  {
    category: 'Spirituality',
    title: 'Growing Deep, Not Just Loud',
    excerpt: 'Teachings and reflections to help you build real spiritual depth, discipline, and consistency in your walk with God.',
    image: whatWeDoImg1,
    body: [
      'Depth in Christ is formed in the quiet places before it is seen on public platforms. Real growth happens when prayer, scripture, and obedience become daily patterns.',
      'At Kairos, we challenge believers to build structure around their faith. Consistency in small spiritual disciplines creates resilience for larger responsibilities.',
      'The goal is not noise or trends. The goal is maturity, clarity, and a life that reflects Christ in private and public.',
    ],
  },
  {
    category: 'Faith & Culture',
    title: 'Living Faith in a Modern World',
    excerpt: 'Conversations on navigating media, career, creativity, and culture without compromising your convictions.',
    image: aboutImg15,
    body: [
      'Believers are called to engage culture, not escape it. The challenge is to participate without losing conviction.',
      'Whether in media, technology, business, or the arts, faith must shape values, decision-making, and the way we treat people.',
      'We believe relevance and holiness can coexist when identity in Christ remains the foundation.',
    ],
  },
  {
    category: 'Leadership & Purpose',
    title: 'Called to Lead with Clarity',
    excerpt: 'Insights to help you understand your calling, build character, and lead yourself and others with wisdom and integrity.',
    image: truthDisciplineImg,
    body: [
      'Leadership begins with self-leadership. Before influencing others, a leader must first develop discipline, humility, and accountability.',
      'Purpose is not discovered in pressure alone; it is refined through prayer, mentorship, and faithful stewardship of present assignments.',
      'Clarity in calling produces courage, and courage guided by character creates lasting impact.',
    ],
  },
  {
    category: 'Community & Formation',
    title: 'We Grow Better Together',
    excerpt: 'Stories, lessons, and guidance on accountability, intentional relationships, and building a faith-driven community.',
    image: whatWeDoImg4,
    body: [
      'Spiritual growth is personal, but it is never meant to be isolated. God forms people in community.',
      'Intentional relationships provide correction, encouragement, and perspective in seasons of growth and transition.',
      'When believers commit to healthy community, they become stronger, wiser, and more fruitful together.',
    ],
  },
];

function toStorySlug(title, index) {
  return `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${index + 1}`;
}

function formatPublishedDate(value) {
  if (!value) return 'Recently';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Recently';
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function mapFeedStoryToUi(story, index) {
  const categories = Array.isArray(story?.categories) && story.categories.length > 0
    ? story.categories
    : [story?.category].filter(Boolean);
  const primaryCategory = categories[0] || 'Spiritual Growth';
  const excerpt = story?.excerpt || '';

  return {
    id: story?.id || `feed-story-${index + 1}`,
    slug: story?.slug || toStorySlug(story?.title || `story-${index + 1}`, index),
    title: story?.title || 'Untitled Story',
    excerpt,
    body: excerpt ? [excerpt] : [''],
    image: story?.coverImageUrl || blogHeroImg,
    category: primaryCategory,
    categories,
    author: story?.author?.fullName || 'Kairos Team',
    avatar: story?.author?.avatarUrl || convenerImg,
    date: formatPublishedDate(story?.publishedAt || story?.createdAt),
    readTime: story?.readTime || '5 mins read',
  };
}

function useBlogFeedStories() {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isCancelled = false;

    async function loadStories() {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetch(BLOG_FEED_ENDPOINT);
        if (!response.ok) throw new Error('Unable to load blog feed');
        const payload = await response.json();
        const feedStories = Array.isArray(payload?.data) ? payload.data : [];
        if (!isCancelled) {
          setStories(feedStories.map(mapFeedStoryToUi));
        }
      } catch (err) {
        if (!isCancelled) {
          setStories([]);
          setError('Could not load live stories.');
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    loadStories();
    return () => {
      isCancelled = true;
    };
  }, []);

  return { stories, isLoading, error };
}

function useBlogTopHeaderStory() {
  const [topHeaderStory, setTopHeaderStory] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadTopHeaderStory() {
      try {
        const response = await fetch(BLOG_TOP_HEADER_ENDPOINT);
        if (!response.ok) throw new Error('Unable to load top header story');
        const payload = await response.json();
        const rawStory = payload?.data || payload;
        if (!isCancelled && rawStory && typeof rawStory === 'object') {
          setTopHeaderStory(mapFeedStoryToUi(rawStory, 0));
        }
      } catch (err) {
        if (!isCancelled) setTopHeaderStory(null);
      }
    }

    loadTopHeaderStory();
    return () => {
      isCancelled = true;
    };
  }, []);

  return { topHeaderStory };
}

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

function IconChurch() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M8 7h8v4h3v10H5V11h3V7z" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M11 16h2v5h-2z" fill="currentColor" />
    </svg>
  );
}

function IconCube() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M12 21v-9.5M4 7.5l8 4 8-4" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

function IconFrame() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 4h12v16H6z" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M8 8h8v8H8z" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M3 7v10M21 7v10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function IconLeader() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M3 18c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M15 11h6M18 8v6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const ABOUT_CORE_IDENTITY_CARDS = [
  { title: 'Understand who they are in Christ', Icon: IconChurch },
  { title: 'Build spiritual depth before visibility', Icon: IconCube },
  { title: 'Develop godly character before influence', Icon: IconFrame },
  { title: 'Lead themselves before leading others', Icon: IconLeader },
];

const ABOUT_MOBILE_MISSION_CARDS = [
  { img: whatWeDoImg10, title: 'Understand identity in Christ', large: true },
  { img: whatWeDoImg2, title: 'Develop discipline and spiritual maturity' },
  { img: whatWeDoImg4, title: 'Build leadership capacity' },
  { img: whatWeDoImg3, title: 'Engage culture with wisdom' },
  { img: whatWeDoImg5, title: 'Engage culture with wisdom' },
];

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setIsNavScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`nav ${isNavScrolled || isMenuOpen ? 'nav--scrolled' : ''}`}>
        <NavLink to="/" className="nav__brand" aria-label="Kairos Summit home">
          <img src={logo} alt="Kairos Summit" className="nav__logo-icon" />
        </NavLink>
        <button
          type="button"
          className="nav__menu-toggle"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
        </button>
        <ul className="nav__links">
          <li>
            <NavLink to="/" end className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}>About</NavLink>
          </li>
          <li>
            <NavLink to="/team-contact" className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}>Team/Contact</NavLink>
          </li>
          <li>
            <NavLink to="/events" className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}>Events</NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}>Blog</NavLink>
          </li>
        </ul>
      </nav>
      <div
        className={`mobile-nav ${isMenuOpen ? 'mobile-nav--open' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <button
          type="button"
          className="mobile-nav__backdrop"
          aria-label="Close navigation menu"
          onClick={() => setIsMenuOpen(false)}
        />
        <aside
          id="mobile-nav-panel"
          className="mobile-nav__panel"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <button
            type="button"
            className="mobile-nav__close"
            aria-label="Close navigation menu"
            onClick={() => setIsMenuOpen(false)}
          >
            ×
          </button>
          <ul className="mobile-nav__links">
            <li>
              <NavLink to="/" end className="mobile-nav__link" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className="mobile-nav__link" onClick={() => setIsMenuOpen(false)}>About</NavLink>
            </li>
            <li>
              <NavLink to="/team-contact" className="mobile-nav__link" onClick={() => setIsMenuOpen(false)}>Team/Contact</NavLink>
            </li>
            <li>
              <NavLink to="/events" className="mobile-nav__link" onClick={() => setIsMenuOpen(false)}>Events</NavLink>
            </li>
            <li>
              <NavLink to="/blog" className="mobile-nav__link" onClick={() => setIsMenuOpen(false)}>Blog</NavLink>
            </li>
          </ul>
          <a href={WHATSAPP_LINK} className="btn btn--primary mobile-nav__cta" target="_blank" rel="noopener noreferrer">Join our community</a>
        </aside>
      </div>
      <a href={WHATSAPP_LINK} className="nav-cta btn btn--primary" target="_blank" rel="noopener noreferrer">Join our community</a>
    </>
  );
}

function SiteFooter() {
  return (
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
        <section className="about-vision-desktop section section--white">
          <div className="about-vision-desktop__inner">
            <div className="about-vision-desktop__left">
              <span className="about-pill about-pill--vision about-vision-desktop__pill">
                <span className="about-pill__dot" aria-hidden />
                Our Vision
              </span>
              <h2 className="about-vision-desktop__title">A Movement, Not Just a Moment</h2>
              <div className="about-vision-desktop__media">
                <img src={aboutImg12} alt="Kairos Summit event audience" />
              </div>
            </div>
            <div className="about-vision-desktop__right">
              <h3 className="about-vision-desktop__heading">
                Get Included at <span className="highlight-gold">Kairos?</span><br />Where We&apos;re Going
              </h3>
              <p className="about-vision-desktop__text">
                A future shaped by believers who live with depth, lead with integrity, and influence culture while remaining firmly rooted in Christ.
              </p>
              <ul className="about-vision-desktop__list">
                <li>Are deeply rooted in Christ</li>
                <li>Are confident in identity and calling</li>
                <li>Influence culture without losing conviction</li>
                <li>Build godly relationships and communities</li>
                <li>Lead with integrity, wisdom, and discipline</li>
              </ul>
              <a href={WHATSAPP_LINK} className="about-vision-desktop__join" target="_blank" rel="noopener noreferrer">
                Join the Community <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </section>
        <section className="about-what-desktop section section--white">
          <div className="about-what-desktop__inner">
            <span className="about-pill about-what-desktop__pill">
              <span className="about-pill__dot" aria-hidden />
              Hero section
            </span>
            <h2 className="about-what-desktop__headline">
              So what happens <span className="highlight-gold">here?</span> Here&apos;s what we do.
            </h2>
            <p className="about-what-desktop__subtext">
              Through gatherings, teachings, and community, Kairos Summit helps believers:
            </p>

            <div className="about-what-desktop__grid">
              <article className="about-what-desktop__card about-what-desktop__card--large">
                <img src={ABOUT_MOBILE_MISSION_CARDS[0].img} alt={ABOUT_MOBILE_MISSION_CARDS[0].title} className="about-what-desktop__image" />
                <span className="about-what-desktop__label">{ABOUT_MOBILE_MISSION_CARDS[0].title}</span>
              </article>
              {ABOUT_MOBILE_MISSION_CARDS.slice(1).map((card, index) => (
                <article key={`${card.title}-desktop-${index}`} className="about-what-desktop__card">
                  <img src={card.img} alt={card.title} className="about-what-desktop__image" />
                  <span className="about-what-desktop__label">{card.title}</span>
                </article>
              ))}
            </div>

            <div className="about-what-desktop__mission">
              <span className="about-pill about-what-desktop__mission-pill">
                <span className="about-pill__dot" aria-hidden />
                Our Mission
              </span>
              <h3 className="about-what-desktop__mission-title">
                Our Mission in <span className="highlight-gold">Motion</span>
              </h3>
              <p className="about-what-desktop__mission-text">
                To equip believers through spiritual formation, leadership development, and intentional community so they can live out their faith with clarity and impact in everyday life.
              </p>
              <a href={WHATSAPP_LINK} className="about-what-desktop__mission-join" target="_blank" rel="noopener noreferrer">
                Join the Community <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </section>
        <section className="about-core section section--white">
          <div className="about-core__inner">
            <h2 className="about-core__headline">
              Welcome to <span className="highlight-gold">Kairos?</span><br />Here&apos;s our Core Identity
            </h2>
            <p className="about-core__text">
              Kairos Summit is not just an event.<br />
              It is not a church replacement.<br />
              It is not a motivational platform.<br />
              <span className="highlight-gold">It is a formation space.</span>
            </p>
            <div className="about-core__cards">
              {ABOUT_CORE_IDENTITY_CARDS.map((item) => (
                <article key={item.title} className="about-core__card">
                  <span className="about-core__icon-wrap">
                    <item.Icon />
                  </span>
                  <h3 className="about-core__card-title">{item.title}</h3>
                </article>
              ))}
            </div>
            <span className="about-pill about-pill--vision">
              <span className="about-pill__dot" aria-hidden />
              Our Vision
            </span>
            <h3 className="about-core__movement-title">A Movement, Not Just a Moment</h3>
            <div className="about-core__movement-media">
              <img src={aboutImg12} alt="Kairos Summit event stage" />
            </div>
          </div>
        </section>
        <section className="about-direction section section--white">
          <div className="about-direction__inner">
            <h2 className="about-direction__headline">
              Get Included at <span className="highlight-gold">Kairos?</span><br />Where We&apos;re Going
            </h2>
            <p className="about-direction__text">
              A future shaped by believers who live with depth, lead with integrity, and influence culture while remaining firmly rooted in Christ.
            </p>
            <ul className="about-direction__list">
              <li>Are deeply rooted in Christ</li>
              <li>Are confident in identity and calling</li>
              <li>Influence culture without losing conviction</li>
              <li>Build godly relationships and communities</li>
              <li>Lead with integrity, wisdom, and discipline</li>
            </ul>
            <a href={WHATSAPP_LINK} className="about-direction__join" target="_blank" rel="noopener noreferrer">
              Join the Community <span aria-hidden>→</span>
            </a>
            <h3 className="about-direction__subheadline">
              So what happens <span className="highlight-gold">here?</span><br />Here&apos;s what we do.
            </h3>
            <p className="about-direction__subtext">
              Through gatherings, teachings, and community, Kairos Summit helps believers:
            </p>
          </div>
        </section>
        <section className="about-mission section section--white">
          <div className="about-mission__inner">
            <div className="about-mission__grid">
              {ABOUT_MOBILE_MISSION_CARDS.map((card, index) => (
                <article
                  key={`${card.title}-${index}`}
                  className={`about-mission__card ${card.large ? 'about-mission__card--large' : ''}`}
                >
                  <img src={card.img} alt={card.title} className="about-mission__image" />
                  <span className="about-mission__label">{card.title}</span>
                </article>
              ))}
            </div>

            <span className="about-pill about-mission__pill">
              <span className="about-pill__dot" aria-hidden />
              Our Mission
            </span>

            <h3 className="about-mission__title">
              Our Mission in <span className="highlight-gold">Motion</span>
            </h3>

            <p className="about-mission__text">
              To equip believers through spiritual formation, leadership development, and intentional community so they can live out their faith with clarity and impact in everyday life.
            </p>

            <a href={WHATSAPP_LINK} className="about-mission__join" target="_blank" rel="noopener noreferrer">
              Join the Community <span aria-hidden>→</span>
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function TeamContactPage() {
  return (
    <div className="landing team-page">
      <NavBar />
      <main className="team-main">
        <section className="team-hero section section--white">
          <div className="team-hero__header">
            <span className="about-pill">
              <span className="about-pill__dot" aria-hidden />
              Teams
            </span>
            <h1 className="team-hero__headline">
              The Dedicated Team Building and<br />Guarding the Kairos Movement
            </h1>
            <p className="team-hero__lead">
              A committed team united by faith, service, and responsibility, working together to build a movement that forms believers, strengthens community, and advances God&apos;s purpose in this generation.
            </p>
            <a href={WHATSAPP_LINK} className="news__link team-hero__top-link" target="_blank" rel="noopener noreferrer">Join the Community <span className="link-arrow__icon" aria-hidden>→</span></a>
          </div>

          <div className="team-profile">
            <div className="team-profile__image-wrap">
              <img src={convenerImg} alt="Convener portrait" className="team-profile__image" />
            </div>
            <div className="team-profile__content">
              <h2 className="team-profile__name">Chikezie Ndubuisi</h2>
              <p className="team-profile__role">Convener</p>
              <p className="team-profile__bio">
                Chikezie Ndubuisi is committed to serving the vision of Kairos Summit with excellence, integrity, and spiritual dedication. Passionate about raising believers who live with clarity and conviction, he contributes to building a community grounded in faith, discipline, and purposeful impact. With a heart for growth and service, Chikezie is devoted to supporting the mission of Kairos by helping create spaces where believers are equipped, strengthened, and aligned to live out their calling boldly in every sphere of life.
              </p>
              <ul className="team-profile__values">
                <li>Spiritually grounded and faith-driven</li>
                <li>Committed to service and excellence</li>
                <li>Passionate about growth and formation</li>
                <li>Reliable and team-oriented</li>
                <li>Leads with integrity and discipline</li>
              </ul>
              <a href={WHATSAPP_LINK} className="news__link team-profile__cta" target="_blank" rel="noopener noreferrer">Join the Community <span className="link-arrow__icon" aria-hidden>→</span></a>
            </div>
          </div>
        </section>

        <section className="team-strip section section--white">
          <div className="team-strip__cards" role="list" aria-label="Team members">
            {TEAM_CONTACT_MEMBERS.map((member, idx) => (
              <article key={`${member.name}-${idx}`} className="team-strip__card" role="listitem">
                <img src={member.img} alt={member.name} className="team-strip__image" />
                <span className="team-strip__overlay" aria-hidden />
                <span className="team-strip__text">
                  <span className="team-strip__name">{member.name}</span>
                  <span className="team-strip__role">{member.role}</span>
                </span>
              </article>
            ))}
          </div>
          <div className="team-strip__mobile-dots" aria-hidden>
            <span className="team-strip__mobile-dot" />
            <span className="team-strip__mobile-dot" />
            <span className="team-strip__mobile-dot team-strip__mobile-dot--active" />
            <span className="team-strip__mobile-dot" />
            <span className="team-strip__mobile-dot" />
          </div>
        </section>

        <section className="contact-section section section--white">
          <div className="contact-section__header">
            <span className="about-pill">
              <span className="about-pill__dot" aria-hidden />
              Our Story
            </span>
            <h2 className="contact-section__title">
              Questions on <span className="highlight-gold">Kairos?</span> Contact Us
            </h2>
          </div>

          <div className="contact-section__grid">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="contact-form__row">
                <label className="contact-form__field">
                  <span className="contact-form__label">Full Name*</span>
                  <input type="text" placeholder="Enter first name" />
                </label>
                <label className="contact-form__field">
                  <span className="contact-form__label">Last Name*</span>
                  <input type="text" placeholder="Enter last name" />
                </label>
              </div>
              <label className="contact-form__field">
                <span className="contact-form__label">Email*</span>
                <input type="email" placeholder="Enter email" />
              </label>
              <label className="contact-form__field">
                <span className="contact-form__label">Phone Number*</span>
                <input type="tel" placeholder="Enter Phone number" />
              </label>
              <label className="contact-form__field">
                <span className="contact-form__label">Message*</span>
                <textarea placeholder="Name" rows={5} />
              </label>
            </form>
            <a href="mailto:admin@kairosummit.org" className="news__link contact-form__cta">Send message <span className="link-arrow__icon" aria-hidden>→</span></a>

            <aside className="contact-details">
              <div className="contact-details__block">
                <h3>Email Support</h3>
                <p>Email us and we would get back to you within 24 hours</p>
                <a href="mailto:admin@kairosummit.org">admin@kairosummit.org</a>
              </div>

              <div className="contact-details__block">
                <h3>Phone</h3>
                <p>Place a call for more inquire</p>
                <a href="tel:+2349136543580">+234 913-654-3580</a>
              </div>

              <div className="contact-details__block">
                <h3>Socials</h3>
                <p>Follow us on our socials.</p>
                <div className="contact-details__socials">
                  <a href="https://www.instagram.com/kairos_summit/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                      <circle cx="12" cy="12" r="3.8" fill="none" stroke="currentColor" strokeWidth="2" />
                      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/share/1FX2cBR5Df/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M14.2 8.1h2V5h-2.4c-3.1 0-4.5 1.8-4.5 4.4V12H7v3h2.3v4h3.1v-4h2.8l.4-3h-3.2V9.9c0-1.1.4-1.8 1.8-1.8z" fill="currentColor" />
                    </svg>
                  </a>
                  <a href="https://x.com/kairos_summit?s=21" target="_blank" rel="noopener noreferrer" aria-label="X">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.9 4h-2.6l-4.2 5-3.8-5H4l6 7.8L4.3 20h2.6l4.4-5.3 4.1 5.3H20l-6.3-8.2L18.9 4z" fill="currentColor" />
                    </svg>
                  </a>
                  <a href="https://youtube.com/@kairossummit-official?si=UQE7oG1sz0M8105R" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="3" y="6.5" width="18" height="11" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
                      <path d="M10 9.6l5.2 2.9L10 15.4V9.6z" fill="currentColor" />
                    </svg>
                  </a>
                </div>
              </div>

              <a href="mailto:admin@kairosummit.org" className="news__link contact-details__cta contact-details__cta--desktop">Send message <span className="link-arrow__icon" aria-hidden>→</span></a>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function BlogPage() {
  const { stories, isLoading, error } = useBlogFeedStories();
  const { topHeaderStory } = useBlogTopHeaderStory();
  const [activeCategory, setActiveCategory] = useState('All');
  const tabCategories = useMemo(
    () => ['All', ...Array.from(
      new Set(
        stories
          .flatMap((story) => (Array.isArray(story.categories) && story.categories.length > 0
            ? story.categories
            : [story.category]))
          .filter(Boolean)
      )
    )],
    [stories]
  );
  const filteredStories = activeCategory === 'All'
    ? stories
    : stories.filter((story) => (
      story.category === activeCategory
      || (Array.isArray(story.categories) && story.categories.includes(activeCategory))
    ));

  useEffect(() => {
    if (!tabCategories.includes(activeCategory)) {
      setActiveCategory('All');
    }
  }, [tabCategories, activeCategory]);

  return (
    <div className="landing blog-page">
      <NavBar />
      <main className="blog-main">
        <section className="blog-hero section section--white">
          <div className="blog-hero__header">
            <span className="about-pill">
              <span className="about-pill__dot" aria-hidden />
              Our Story
            </span>
            <h1 className="blog-hero__title">
              Know more <span className="highlight-gold">Kairos?</span> Read our blog
            </h1>
            <p className="blog-hero__subtitle">
              Thoughts, teachings, and conversations for aligned believers
            </p>
          </div>

          {topHeaderStory ? (
            <article className="blog-featured">
              <img src={topHeaderStory.image || blogHeroImg} alt={topHeaderStory.title || 'Featured Kairos story'} className="blog-featured__image" />
              <div className="blog-featured__overlay">
                <h2 className="blog-featured__headline">
                  <span className="highlight-gold">{topHeaderStory.title}</span>
                </h2>
                <p className="blog-featured__excerpt">
                  {topHeaderStory.excerpt}
                </p>
                <div className="blog-featured__meta">
                  <span className="blog-featured__author">
                    <span className="blog-featured__author-dot" aria-hidden />
                    {topHeaderStory.author}
                  </span>
                  <span className="blog-featured__date">{topHeaderStory.date}</span>
                  <span className="blog-featured__tag">update</span>
                </div>
              </div>
            </article>
          ) : null}
        </section>

        <section className="blog-stories section section--white">
          <div className="blog-stories__header">
            <div className="blog-stories__mobile-head">
              <h2 className="blog-stories__title">Recent Stories</h2>
              <button type="button" className="blog-stories__filter-btn" aria-label="Filter stories">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 7h16M4 17h16M9 7v0M15 17v0M15 7a2 2 0 1 0 0.001 0M9 17a2 2 0 1 0 0.001 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="blog-stories__top-row">
              <div className="blog-stories__tabs" role="tablist" aria-label="Story categories">
                {tabCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`blog-stories__tab ${activeCategory === category ? 'blog-stories__tab--active' : ''}`}
                    role="tab"
                    aria-selected={activeCategory === category}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="blog-stories__search" role="search">
                <input type="search" placeholder="Search" aria-label="Search stories" />
                <span className="blog-stories__search-icon" aria-hidden>⌕</span>
              </div>
            </div>
          </div>

          {isLoading ? <p className="blog-stories__status">Loading stories...</p> : null}
          {error ? <p className="blog-stories__status">{error}</p> : null}
          {!isLoading && !error && filteredStories.length === 0 ? <p className="blog-stories__status">No stories available for this category.</p> : null}
          <div className="blog-stories__grid">
            {filteredStories.map((story) => (
              <Link key={story.id} to={`/blog/${story.slug}`} className="story-card" aria-label={`Read story: ${story.title}`}>
                <img src={story.image} alt={story.title} className="story-card__image" />
                <p className="story-card__category">{story.category}</p>
                <h3 className="story-card__title">{story.title}</h3>
                <p className="story-card__excerpt">{story.excerpt}</p>
                <div className="story-card__meta">
                  <span className="story-card__author">
                    <img src={story.avatar || convenerImg} alt="" aria-hidden className="story-card__avatar" />
                    {story.author}
                  </span>
                  <span className="story-card__time">{story.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function BlogStoryPage() {
  const { storySlug } = useParams();
  const { stories, isLoading } = useBlogFeedStories();
  const story = stories.find((item) => item.slug === storySlug);
  const [commentName, setCommentName] = useState('');
  const [commentReply, setCommentReply] = useState('');
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [comments, setComments] = useState([]);

  const mapApiCommentToUi = (comment, index) => ({
    id: comment?.id || `comment-${index + 1}`,
    name: comment?.authorName || 'Anonymous',
    reply: comment?.content || '',
    date: comment?.timeAgo || formatPublishedDate(comment?.createdAt),
  });

  useEffect(() => {
    if (!story) return;
    let isCancelled = false;

    async function loadComments() {
      setIsCommentsLoading(true);
      try {
        let response = await fetch(`${BLOG_API_BASE_URL}/api/blogs/${encodeURIComponent(story.slug)}/comments`);
        if (!response.ok && story.id) {
          response = await fetch(`${BLOG_API_BASE_URL}/api/blogs/${encodeURIComponent(story.id)}/comments`);
        }
        if (!response.ok) throw new Error('Unable to load comments');
        const payload = await response.json();
        const apiComments = Array.isArray(payload?.data) ? payload.data : [];
        if (!isCancelled) {
          setComments(apiComments.map(mapApiCommentToUi));
        }
      } catch (error) {
        if (!isCancelled) {
          setComments([]);
        }
      } finally {
        if (!isCancelled) setIsCommentsLoading(false);
      }
    }

    loadComments();
    return () => {
      isCancelled = true;
    };
  }, [story]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (isCommentSubmitting || !story) return;

    const cleanName = commentName.trim();
    const cleanReply = commentReply.trim();
    if (!cleanName || !cleanReply) return;

    setIsCommentSubmitting(true);
    try {
      const response = await fetch(
        `${BLOG_API_BASE_URL}/api/blogs/${encodeURIComponent(story.slug)}/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            authorName: cleanName,
            content: cleanReply,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Unable to post comment');
      }

      const payload = await response.json().catch(() => null);
      const createdComment = payload?.data
        ? mapApiCommentToUi(payload.data, 0)
        : {
            id: `comment-${Date.now()}`,
            name: cleanName,
            reply: cleanReply,
            date: 'Just now',
          };
      setComments((prev) => [
        createdComment,
        ...prev,
      ]);
      setCommentName('');
      setCommentReply('');
    } catch (error) {
      // Keep UX minimal: comment box remains filled for retry.
    } finally {
      setIsCommentSubmitting(false);
    }
  };

  const relatedStories = story
    ? stories
      .filter((item) => item.slug !== story.slug)
      .filter((item) => {
        const storyCategories = Array.isArray(story.categories) ? story.categories : [story.category];
        const itemCategories = Array.isArray(item.categories) ? item.categories : [item.category];
        return itemCategories.some((category) => storyCategories.includes(category));
      })
      .slice(0, 3)
    : [];

  if (isLoading) {
    return (
      <div className="landing blog-page blog-details-page">
        <NavBar />
        <main className="blog-details-main">
          <section className="blog-details section section--white">
            <div className="blog-details__container">
              <h1 className="blog-details__title">Loading story...</h1>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!story) {
    return (
      <div className="landing blog-page blog-details-page">
        <NavBar />
        <main className="blog-details-main">
          <section className="blog-details section section--white">
            <div className="blog-details__container">
              <h1 className="blog-details__title">Story not found</h1>
              <p className="blog-details__intro">The article you are trying to open does not exist.</p>
              <Link to="/blog" className="news__link">Back to blog <span className="link-arrow__icon" aria-hidden>→</span></Link>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="landing blog-page blog-details-page">
      <NavBar />
      <main className="blog-details-main">
        <section className="blog-details section section--white">
          <div className="blog-details__container">
            <Link to="/blog" className="news__link blog-details__back">Back to all stories <span className="link-arrow__icon" aria-hidden>→</span></Link>
            <div className="blog-details__hero">
              <img src={story.image} alt={story.title} className="blog-details__hero-image" />
            </div>

            <p className="blog-details__category">{story.category}</p>
            <h1 className="blog-details__title">{story.title}</h1>
            <div className="blog-details__meta">
              <span className="blog-details__author">{story.author}</span>
              <span className="blog-details__dot" aria-hidden />
              <span className="blog-details__date">{story.date}</span>
              <span className="blog-details__dot" aria-hidden />
              <span className="blog-details__time">{story.readTime}</span>
            </div>

            <article className="blog-details__body">
              {story.body.map((paragraph, index) => (
                <p key={`${story.id}-paragraph-${index}`}>{paragraph}</p>
              ))}
            </article>

            <section className="blog-comments">
              <div className="blog-comments__head">
                <h2 className="blog-comments__title">Replies and Comments</h2>
                <p className="blog-comments__count">{comments.length} comment{comments.length === 1 ? '' : 's'}</p>
              </div>

              <form className="blog-comments__form" onSubmit={handleCommentSubmit}>
                <label className="blog-comments__field">
                  <span>Your Name</span>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={commentName}
                    onChange={(event) => setCommentName(event.target.value)}
                  />
                </label>
                <label className="blog-comments__field">
                  <span>Your Reply</span>
                  <textarea
                    rows={4}
                    placeholder="Share your thoughts"
                    value={commentReply}
                    onChange={(event) => setCommentReply(event.target.value)}
                  />
                </label>
                <button type="submit" className="btn btn--primary blog-comments__submit" disabled={isCommentSubmitting}>
                  {isCommentSubmitting ? 'Posting...' : 'Post comment'}
                </button>
              </form>

              <div className="blog-comments__list">
                {isCommentsLoading ? <p className="blog-related__empty">Loading comments...</p> : null}
                {comments.map((comment) => (
                  <article key={comment.id} className="blog-comment">
                    <div className="blog-comment__header">
                      <h3 className="blog-comment__name">{comment.name}</h3>
                      <span className="blog-comment__date">{comment.date}</span>
                    </div>
                    <p className="blog-comment__reply">{comment.reply}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="blog-related">
              <div className="blog-related__head">
                <h2 className="blog-related__title">Related Stories</h2>
              </div>
              {relatedStories.length > 0 ? (
                <div className="blog-related__grid">
                  {relatedStories.map((relatedStory) => (
                    <Link
                      key={relatedStory.id}
                      to={`/blog/${relatedStory.slug}`}
                      className="blog-related-card"
                      aria-label={`Read related story: ${relatedStory.title}`}
                    >
                      <img src={relatedStory.image} alt={relatedStory.title} className="blog-related-card__image" />
                      <div className="blog-related-card__content">
                        <p className="blog-related-card__category">{relatedStory.category}</p>
                        <h3 className="blog-related-card__title">{relatedStory.title}</h3>
                        <p className="blog-related-card__excerpt">{relatedStory.excerpt}</p>
                        <div className="blog-related-card__meta">
                          <span>{relatedStory.author}</span>
                          <span>{relatedStory.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="blog-related__empty">No related stories yet.</p>
              )}
            </section>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function EventsPage() {
  return (
    <div className="landing event-page">
      <NavBar />
      <main className="event-main">
        <section className="event-coming section section--white">
          <div className="event-coming__inner">
            <span className="about-pill">
              <span className="about-pill__dot" aria-hidden />
              Events
            </span>
            <h1 className="event-coming__title">
              Events at <span className="highlight-gold">Kairos</span>
            </h1>
            <p className="event-coming__text">Coming Soon</p>
          </div>
        </section>
      </main>
      <SiteFooter />
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

  useEffect(() => {
    // Ensure the browser tab icon uses the Kairos logo.
    let favicon = document.querySelector("link[rel='icon']");
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.setAttribute('rel', 'icon');
      document.head.appendChild(favicon);
    }
    favicon.setAttribute('type', 'image/svg+xml');
    favicon.setAttribute('href', logo);
  }, []);

  return (
    <Routes>
      <Route path="/about" element={<AboutPage />} />
      <Route path="/team-contact" element={<TeamContactPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:storySlug" element={<BlogStoryPage />} />
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

      <SiteFooter />
    </div>
      } />
    </Routes>
  );
}

export default App;
