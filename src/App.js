import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, NavLink, Link, useLocation, useParams } from 'react-router-dom';
import './App.css';

import logo from './assets/images/icons/logo.svg';
import ideaIcon from './assets/icons/idea-01.png';
import heroBg from './assets/images/pictures/3.jpeg';
import remnantsRebornImg from './assets/images/pictures/remnants-reborn-hero.jpg';
import remnantsRebornBanner from './assets/images/pictures/20260902_124449.jpg';
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
import bisolaBadejoImg from './assets/images/speakers/bisola-badejo.jpg';
import victorJeremiahImg from './assets/images/speakers/victor-jeremiah.jpg';
import barrIllasheImg from './assets/images/speakers/barr-illashe.jpg';
import victorOkeomaImg from './assets/images/speakers/victor-okeoma.jpg';
import mamusOfigoImg from './assets/images/speakers/mamus-ofigo.jpg';
import uzunmaEkeruoImg from './assets/images/speakers/uzunma-ekeruo.jpg';
import uganzeChikezieImg from './assets/images/speakers/uganze-chikezie.jpg';
import maioImg from './assets/images/speakers/maio.jpg';
import emiraEdjImg from './assets/images/speakers/emira-edj.jpg';
import joyAgbaleImg from './assets/images/speakers/joy-oluwasanmi-agbale.jpg';
import pastIhediwaMaxwellImg from './assets/images/previous-speakers/ihediwa-maxwell.jpg';
import pastSeyiAbiodunImg from './assets/images/previous-speakers/seyi-abiodun.jpg';
import pastVictorOkeomaImg from './assets/images/previous-speakers/victor-okeoma.jpg';
import pastUzunmaEkeruoImg from './assets/images/previous-speakers/uzunma-ekeruo.jpg';
import pastUganzeChikezieImg from './assets/images/previous-speakers/uganze-chikezie.jpg';
import pastOluchiKemeImg from './assets/images/previous-speakers/oluchi-keme.jpg';
import tshirtBlackImg from './assets/images/merch/tshirt-black.jpg';
import tshirtWhiteImg from './assets/images/merch/tshirt-white.jpg';
import tshirtNavyImg from './assets/images/merch/tshirt-navy.jpg';
import tshirtOliveImg from './assets/images/merch/tshirt-olive.jpg';
import tshirtMaroonImg from './assets/images/merch/tshirt-maroon.jpg';
import capBlackImg from './assets/images/merch/cap-black.jpg';
import capWhiteImg from './assets/images/merch/cap-white.jpg';
import capNavyImg from './assets/images/merch/cap-navy.jpg';
import capOliveImg from './assets/images/merch/cap-olive.jpg';
import capMaroonImg from './assets/images/merch/cap-maroon.jpg';

const WHATSAPP_LINK = 'https://chat.whatsapp.com/CyPJlBlV4JhCxMstJAOIrq?mode=gi_t';
const EVENT_START = '2026-11-14T10:00:00+01:00'; // Remnants Reborn, 10:00 AM WAT
const INSTAGRAM_LINK = 'https://www.instagram.com/kairos_summit/';
const BLOG_API_BASE_URL = 'https://blogger-backend-km7w.onrender.com'; // live Render API
const BLOG_FEED_ENDPOINT = `${BLOG_API_BASE_URL}/api/blogs/feed?page=1&limit=20`;
const BLOG_TOP_HEADER_ENDPOINT = `${BLOG_API_BASE_URL}/api/blogs/top-header`;
const REGISTER_ENDPOINT = `${BLOG_API_BASE_URL}/api/registrations`;

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
  { img: remnantsRebornImg, title: 'Remnants Reborn.' },
  { img: truthDisciplineImg, title: 'Truth & Discipline.' },
  { img: whatWeDoImg3, title: 'Community & Growth.' },
  { img: whoWeAreImg, title: 'Who We Are.' },
  { img: whatWeDoImg1, title: 'Formation Gathering.' },
  { img: whatWeDoImg2, title: 'Kairos Summit 2026.' },
];

const KAIROS_NUMBERS = [
  { value: '250+', label: 'Community Members' },
  { value: '1,000+', label: 'Summit Attendees' },
  { value: '10', label: 'Virtual Events' },
  { value: '12+', label: 'Guest Speakers' },
  { value: '1', label: 'Edition Delivered' },
  { value: '10+', label: 'Sponsors' },
];

// Fill in { name, role, img } on each entry as speakers are confirmed.
const CONFIRMED_SPEAKERS = [
  {
    id: 'confirmed-1',
    name: 'Pst. Bisola Badejo',
    role: 'CEO, Celebration Church International',
    img: bisolaBadejoImg,
  },
  { id: 'confirmed-2' },
  { id: 'confirmed-3' },
  { id: 'confirmed-4' },
];

const EVENT_LINEUP = [
  { id: 'lineup-1', name: 'Pst. Victor Jeremiah', role: 'Panelist', img: victorJeremiahImg },
  { id: 'lineup-2', name: 'Mrs. Uzunma Ekeruo', role: 'Panelist', img: uzunmaEkeruoImg },
  { id: 'lineup-3', name: 'Pst. Barr Illashe', role: 'Panelist', img: barrIllasheImg },
  { id: 'lineup-4', name: 'Pst. Victor Okeoma', role: 'Panelist', img: victorOkeomaImg },
  { id: 'lineup-5', name: 'Pst. Mamus Ofigo', role: 'Panelist', img: mamusOfigoImg },
  { id: 'lineup-6', name: 'Maio', role: 'Music Artist', img: maioImg },
  { id: 'lineup-7', name: 'Emira Edj', role: 'Spoken Word Artist', img: emiraEdjImg },
  { id: 'lineup-8', name: 'Uganze Chikezie', role: 'Host', img: uganzeChikezieImg },
  { id: 'lineup-9', name: 'Joy Oluwasanmi-Agbale', role: 'Host', img: joyAgbaleImg },
];

const PREVIOUS_SPEAKERS = [
  { id: 'previous-1', name: 'Ihediwa Maxwell', role: 'Speaker', img: pastIhediwaMaxwellImg },
  { id: 'previous-2', name: 'Seyi Abiodun', role: 'Speaker', img: pastSeyiAbiodunImg },
  { id: 'previous-3', name: 'Pst. Victor Okeoma', role: 'Speaker', img: pastVictorOkeomaImg },
  { id: 'previous-4', name: 'Mrs. Uzunma Ekeruo', role: 'Facilitator', img: pastUzunmaEkeruoImg },
  { id: 'previous-5', name: 'Uganze Chikezie', role: 'Host', img: pastUganzeChikezieImg },
  { id: 'previous-6', name: 'Oluchi Keme', role: 'Co-Host', img: pastOluchiKemeImg },
];

// Swatches are sampled off the mockups, and each colour carries the photo the
// gallery shows when it is picked. Adjust prices as stock is confirmed.
const SHOP_PRODUCTS = [
  {
    id: 'tshirt',
    name: 'Kairos Summit Official T-Shirt',
    tagline: 'Equipping, imparting, activating and connecting kingdom creatives',
    price: 8000,
    tabLabel: 'T-Shirt',
    colours: [
      { id: 'black', label: 'Black', swatch: '#101010', img: tshirtBlackImg },
      { id: 'white', label: 'White', swatch: '#f1f1ef', img: tshirtWhiteImg },
      { id: 'navy', label: 'Navy', swatch: '#1d2130', img: tshirtNavyImg },
      { id: 'olive', label: 'Olive', swatch: '#3c3f31', img: tshirtOliveImg },
      { id: 'maroon', label: 'Oxblood', swatch: '#2f1616', img: tshirtMaroonImg },
    ],
    sizes: ['M', 'L', 'XL', 'XXL', 'XXXL'],
  },
  {
    id: 'cap',
    name: 'Kairos Summit Face Cap',
    tagline: 'Everyday cover for the remnant',
    price: 4000,
    tabLabel: 'Face Cap',
    colours: [
      {
        id: 'black-gold',
        label: 'Black and Gold',
        swatch: 'linear-gradient(160deg, #161616 0 58%, #deb04f 58%)',
        img: capBlackImg,
      },
      {
        id: 'white',
        label: 'White and Charcoal',
        swatch: 'linear-gradient(160deg, #f1f1ef 0 58%, #373737 58%)',
        img: capWhiteImg,
      },
      { id: 'navy', label: 'Navy', swatch: '#23252e', img: capNavyImg },
      { id: 'olive', label: 'Olive', swatch: '#2f322c', img: capOliveImg },
      {
        id: 'maroon-gold',
        label: 'Oxblood and Gold',
        swatch: 'linear-gradient(160deg, #2c1b1b 0 58%, #deb04f 58%)',
        img: capMaroonImg,
      },
    ],
    sizes: [],
  },
];

const NAME_TITLES = ['Mr.', 'Mrs.', 'Miss', 'Ms.', 'Dr.', 'Pst.'];
const VOLUNTEER_AREAS = [
  'Ushering/Protocol',
  'Publicity',
  'Content Creation',
  'Logistics',
  'Medicals',
];
const VOLUNTEER_AVAILABILITY = ['Full Day', 'Morning Only', 'Afternoon Only'];

const PAYSTACK_PUBLIC_KEY = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || '';
const PAYSTACK_SCRIPT_SRC = 'https://js.paystack.co/v1/inline.js';
const WHATSAPP_ORDER_NUMBER = '2349136543580';

const TEAM_CONTACT_MEMBERS = [
  { img: johnImg, name: 'John Nnaoma', role: 'Personal Assistant' },
  { img: laneImg, name: 'Lane Onwa', role: 'Administrative Assistant' },
  { img: joyImg, name: 'Joy Oluwasanmi', role: 'Community Manager' },
  { img: deeImg, name: 'Deeshan Nkosi', role: 'Social Media Manager' },
  { img: blessingImg, name: 'Blessing Abosede', role: 'Public Relations' },
  { img: obasImg, name: 'Obas Daniel', role: 'Creative Designer' },
];

function toStorySlug(title, index) {
  return `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${index + 1}`;
}

function getCountdownParts(target) {
  const secondsLeft = Math.max(0, Math.floor((target - Date.now()) / 1000));
  return [
    { label: 'Days', value: Math.floor(secondsLeft / 86400) },
    { label: 'Hours', value: Math.floor((secondsLeft % 86400) / 3600) },
    { label: 'Minutes', value: Math.floor((secondsLeft % 3600) / 60) },
    { label: 'Seconds', value: secondsLeft % 60 },
  ];
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
            <NavLink to="/speakers" className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}>Speakers</NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}>Blog</NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}>Shop</NavLink>
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
              <NavLink to="/speakers" className="mobile-nav__link" onClick={() => setIsMenuOpen(false)}>Speakers</NavLink>
            </li>
            <li>
              <NavLink to="/blog" className="mobile-nav__link" onClick={() => setIsMenuOpen(false)}>Blog</NavLink>
            </li>
            <li>
              <NavLink to="/shop" className="mobile-nav__link" onClick={() => setIsMenuOpen(false)}>Shop</NavLink>
            </li>
          </ul>
          <a href={WHATSAPP_LINK} className="btn btn--primary mobile-nav__cta" target="_blank" rel="noopener noreferrer">Join our community</a>
        </aside>
      </div>
      <a href={WHATSAPP_LINK} className="nav-cta btn btn--primary" target="_blank" rel="noopener noreferrer">Join our community</a>
    </>
  );
}

function SpeakerCard({ speaker, tapToReveal = false }) {
  const { name, role, img } = speaker;
  // Touch screens have no hover, so a tap is what brings a flier to colour there.
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <article
      className={`speaker-card ${isRevealed ? 'speaker-card--revealed' : ''}`}
      onClick={tapToReveal ? () => setIsRevealed((prev) => !prev) : undefined}
    >
      <div className="speaker-card__poster">
        {img ? (
          <img src={img} alt={name} className="speaker-card__photo" />
        ) : (
          <div className="speaker-card__poster-blank">
            <img src={logo} alt="" className="speaker-card__poster-logo" />
            <span className="speaker-card__poster-word">Speaker</span>
          </div>
        )}
      </div>
      <h3 className="speaker-card__name">{name || 'To be announced'}</h3>
      <p className="speaker-card__role">{role || 'Reveal coming soon'}</p>
    </article>
  );
}

function SpeakersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="landing speakers-page">
      <NavBar />
      <main className="speakers-main">
        <header className="speakers-hero">
          <p className="speakers-hero__kicker">Second edition <span aria-hidden>·</span> 2026</p>
          <h1 className="speakers-hero__title">All Confirmed Speakers</h1>
          <p className="speakers-hero__lead">
            Meet the pastors, creatives, and industry voices confirmed for Remnants Reborn, 14 November 2026.
          </p>
          <a href="#previous-speakers" className="speakers-hero__jump">
            Looking for past editions? View previous speakers <span aria-hidden>→</span>
          </a>
        </header>

        <section className="speakers-list speakers-list--fliers" aria-labelledby="speaker-heading">
          <h2 id="speaker-heading" className="speakers-list__title speakers-list__title--tight">Speakers</h2>
          <div className="speakers-grid">
            {CONFIRMED_SPEAKERS.map((speaker) => (
              <SpeakerCard key={speaker.id} speaker={speaker} tapToReveal />
            ))}
          </div>
        </section>

        <section className="speakers-list speakers-list--lineup speakers-list--fliers" aria-labelledby="lineup-heading">
          <h2 id="lineup-heading" className="speakers-list__title speakers-list__title--tight">
            Panelists, Music Artists and Hosts
          </h2>
          <div className="speakers-grid">
            {EVENT_LINEUP.map((person) => (
              <SpeakerCard key={person.id} speaker={person} tapToReveal />
            ))}
          </div>
        </section>

        <section className="speakers-list speakers-list--previous speakers-list--fliers" id="previous-speakers" aria-labelledby="previous-speakers-heading">
          <p className="speakers-list__kicker">First edition <span aria-hidden>·</span> 2024</p>
          <h2 id="previous-speakers-heading" className="speakers-list__title">Previous Speakers</h2>
          <div className="speakers-grid">
            {PREVIOUS_SPEAKERS.map((speaker) => (
              <SpeakerCard key={speaker.id} speaker={speaker} tapToReveal />
            ))}
          </div>
        </section>

        <section className="speakers-contact" aria-labelledby="speakers-contact-heading">
          <div className="speakers-contact__inner">
            <p className="speakers-contact__kicker">Get in touch</p>
            <h2 id="speakers-contact-heading" className="speakers-contact__title">
              Have questions, suggestions, or partnership ideas? Let&apos;s build this movement, together.
            </h2>
            <div className="speakers-contact__cards">
              <div className="speakers-contact__card">
                <span className="speakers-contact__icon" aria-hidden>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
                    <path d="m3.5 6.5 8.5 6 8.5-6" />
                  </svg>
                </span>
                <h3 className="speakers-contact__card-title">Email Us</h3>
                <p className="speakers-contact__card-note">General inquiries and partnerships</p>
                <a href="mailto:admin@kairosummit.org" className="speakers-contact__card-link">admin@kairosummit.org</a>
              </div>
              <div className="speakers-contact__card">
                <span className="speakers-contact__icon" aria-hidden>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                    <path d="M7.5 3.5h-3a1.5 1.5 0 0 0-1.5 1.6c.4 5.3 2.4 9.5 6 12.6 2.8 2.4 5.6 2.9 7 2.8a1.5 1.5 0 0 0 1.4-1.5v-2.8l-4-1.6-2 2a13 13 0 0 1-5-5.4l2.1-1.9-1-3.8Z" />
                  </svg>
                </span>
                <h3 className="speakers-contact__card-title">Call Us</h3>
                <p className="speakers-contact__card-note">Available on weekdays</p>
                <a href="tel:+2349136543580" className="speakers-contact__card-link">+234 913-654-3580</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function EventCountdownBar() {
  const target = useMemo(() => new Date(EVENT_START).getTime(), []);
  const [parts, setParts] = useState(() => getCountdownParts(target));
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const tick = setInterval(() => setParts(getCountdownParts(target)), 1000);
    return () => clearInterval(tick);
  }, [target]);

  if (isHidden) return null;

  return (
    <aside className="countdown-bar" aria-label="Countdown to Remnants Reborn">
      <p className="countdown-bar__event">
        Remnants Reborn <span aria-hidden>·</span> Port Harcourt, Rivers State
      </p>
      <div className="countdown-bar__clock">
        {parts.map(({ label, value }) => (
          <div className="countdown-bar__unit" key={label}>
            <span className="countdown-bar__value">{String(value).padStart(2, '0')}</span>
            <span className="countdown-bar__label">{label}</span>
          </div>
        ))}
      </div>
      <div className="countdown-bar__actions">
        <Link to="/register" className="countdown-bar__btn countdown-bar__btn--gold">Get Ticket</Link>
        <Link to="/volunteer" className="countdown-bar__btn">Volunteer</Link>
        <button
          type="button"
          className="countdown-bar__close"
          onClick={() => setIsHidden(true)}
          aria-label="Hide countdown"
        >
          ×
        </button>
      </div>
    </aside>
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
        <section className="events-intro section section--white">
          <div className="events-intro__grid">
            <div className="events-intro__left">
              <span className="about-pill">
                <span className="about-pill__dot" aria-hidden />
                Gatherings
              </span>
              <h1 className="events-intro__title">
                We meet in rooms,<br />not just on screens.
              </h1>
            </div>
            <div className="events-intro__right">
              <p className="events-intro__text">
                Kairos Summit gatherings are formation spaces for teaching, honest conversation, and the kind of room you leave more rooted than you arrived. The next major one is in Port Harcourt.
              </p>
              <Link to="/register" className="events-intro__jump">
                Where to register <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="events-feature section section--white" aria-labelledby="events-feature-heading">
          <div className="events-feature__inner">
            <div className="events-feature__media">
              <img src={remnantsRebornBanner} alt="Remnants Reborn, Kairos Summit, 14 November 2026 at Celebr8 Centre" />
              <span className="events-feature__badge">Next gathering</span>
            </div>
            <div className="events-feature__copy">
              <p className="events-feature__kicker">Saturday, 14 November 2026</p>
              <h2 id="events-feature-heading" className="events-feature__name">Remnants Reborn</h2>
              <p className="events-feature__lede">
                The next major Kairos Summit gathering. Same assignment as always: believers who want depth, not just a night of energy. If you have been waiting for a reason to show up in person, this is it.
              </p>
              <dl className="events-feature__facts">
                <div>
                  <dt>Venue</dt>
                  <dd>Celebr8 Centre, Olu Obasanjo Road</dd>
                </div>
                <div>
                  <dt>Date</dt>
                  <dd>14 November 2026</dd>
                </div>
                <div>
                  <dt>Time</dt>
                  <dd>10:00 AM</dd>
                </div>
              </dl>
              <Link to="/register" className="events-feature__link">
                Register for Remnants Reborn <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="events-register section" id="register" aria-labelledby="events-register-heading">
          <div className="events-register__inner">
            <div className="events-register__copy">
              <span className="events-register__pill">Where to register</span>
              <h2 id="events-register-heading" className="events-register__title">
                You register here, on Kairos Summit.
              </h2>
              <p className="events-register__text">
                Remnants Reborn seats are taken on this site, not in WhatsApp. The group is for staying in the conversation. Registration has its own page.
              </p>
              <Link to="/register" className="btn events-register__cta">
                Register for Remnants Reborn
              </Link>
              <p className="events-register__note">
                Want the community too? That still lives on
                {' '}
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                {' '}
                and
                {' '}
                <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">Instagram</a>.
                {' '}
                It is not how you get a seat.
              </p>
            </div>
            <figure className="events-register__figure">
              <img src={aboutImg12} alt="Attendees registering at Kairos Summit 2024" />
              <figcaption>Registration, Kairos Summit 2024</figcaption>
            </figure>
          </div>
        </section>

        <section className="events-past section section--white" aria-labelledby="events-past-heading">
          <div className="events-past__inner">
            <div className="events-past__copy">
              <span className="about-pill">
                <span className="about-pill__dot" aria-hidden />
                Last year
              </span>
              <h2 id="events-past-heading" className="events-past__title">
                Port Harcourt, June 2024
              </h2>
              <p className="events-past__text">
                The last Kairos Summit filled a hall with lanyards, notebooks, and people who stayed after the last session. Remnants Reborn is the next chapter of that same room.
              </p>
            </div>
            <div className="events-past__photos">
              <figure className="events-past__shot events-past__shot--main">
                <img src={aboutImg13} alt="Audience at Kairos Summit 2024" />
              </figure>
              <figure className="events-past__shot events-past__shot--side">
                <img src={aboutImg14} alt="Panel on stage at Kairos Summit 2024" />
              </figure>
              <figure className="events-past__shot events-past__shot--low">
                <img src={aboutImg15} alt="Speaker at Kairos Summit 2024" />
              </figure>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function formatNaira(amount) {
  return `\u20a6${amount.toLocaleString('en-NG')}`;
}

function makeOrderReference() {
  const stamp = Date.now().toString(36).toUpperCase();
  const noise = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `KS-${stamp}-${noise}`;
}

function ShopPage() {
  const [productId, setProductId] = useState(SHOP_PRODUCTS[0].id);
  const product = SHOP_PRODUCTS.find((item) => item.id === productId) || SHOP_PRODUCTS[0];

  const [colourId, setColourId] = useState(product.colours[0].id);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [stage, setStage] = useState('options');
  const [buyer, setBuyer] = useState({ name: '', email: '', phone: '', address: '' });
  const [formError, setFormError] = useState('');
  const [isPaymentReady, setIsPaymentReady] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const colour = product.colours.find((item) => item.id === colourId) || product.colours[0];
  const subtotal = useMemo(() => product.price * quantity, [product.price, quantity]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!PAYSTACK_PUBLIC_KEY) return undefined;
    if (window.PaystackPop) {
      setIsPaymentReady(true);
      return undefined;
    }

    const existing = document.querySelector(`script[src="${PAYSTACK_SCRIPT_SRC}"]`);
    const script = existing || document.createElement('script');
    const onReady = () => setIsPaymentReady(true);

    script.addEventListener('load', onReady);
    if (!existing) {
      script.src = PAYSTACK_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }

    return () => script.removeEventListener('load', onReady);
  }, []);

  function selectProduct(nextId) {
    const next = SHOP_PRODUCTS.find((item) => item.id === nextId);
    if (!next) return;
    setProductId(nextId);
    setColourId(next.colours[0].id);
    setSize('');
    setQuantity(1);
    setStage('options');
    setFormError('');
  }

  function orderSummaryText(reference) {
    const lines = [
      'New Kairos Summit merch order',
      `Item: ${product.name}`,
      `Colour: ${colour.label}`,
      product.sizes.length ? `Size: ${size}` : null,
      `Quantity: ${quantity}`,
      `Subtotal: ${formatNaira(subtotal)}`,
      reference ? `Reference: ${reference}` : null,
      buyer.name ? `Name: ${buyer.name}` : null,
      buyer.phone ? `Phone: ${buyer.phone}` : null,
      buyer.address ? `Deliver to: ${buyer.address}` : null,
    ];
    return lines.filter(Boolean).join('\n');
  }

  function openWhatsAppOrder(reference) {
    const url = `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${encodeURIComponent(orderSummaryText(reference))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function handleProceed() {
    if (product.sizes.length && !size) {
      setFormError('Pick a size before you continue.');
      return;
    }
    setFormError('');
    setStage('details');
  }

  function updateBuyer(field, value) {
    setBuyer((prev) => ({ ...prev, [field]: value }));
  }

  function handleCheckout(event) {
    event.preventDefault();
    const name = buyer.name.trim();
    const email = buyer.email.trim();
    const phone = buyer.phone.trim();
    const address = buyer.address.trim();

    if (!name || !email || !phone || !address) {
      setFormError('Fill in your name, email, phone and delivery address.');
      return;
    }

    setFormError('');
    const reference = makeOrderReference();
    const order = {
      reference,
      item: product.name,
      colour: colour.label,
      size: product.sizes.length ? size : '',
      quantity,
      subtotal,
    };

    if (!PAYSTACK_PUBLIC_KEY || !isPaymentReady || !window.PaystackPop) {
      openWhatsAppOrder(reference);
      return;
    }

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email,
      amount: subtotal * 100, // Paystack charges in kobo
      currency: 'NGN',
      ref: reference,
      metadata: {
        custom_fields: [
          { display_name: 'Item', variable_name: 'item', value: product.name },
          { display_name: 'Colour', variable_name: 'colour', value: colour.label },
          { display_name: 'Size', variable_name: 'size', value: product.sizes.length ? size : 'One size' },
          { display_name: 'Quantity', variable_name: 'quantity', value: String(quantity) },
          { display_name: 'Buyer', variable_name: 'buyer_name', value: name },
          { display_name: 'Phone', variable_name: 'phone', value: phone },
          { display_name: 'Delivery address', variable_name: 'delivery_address', value: address },
        ],
      },
      callback: () => {
        setPlacedOrder(order);
        setStage('done');
      },
      onClose: () => setFormError(''),
    });

    handler.openIframe();
  }

  function startAnotherOrder() {
    setPlacedOrder(null);
    setBuyer({ name: '', email: '', phone: '', address: '' });
    setQuantity(1);
    setSize('');
    setStage('options');
  }

  return (
    <div className="landing shop-page">
      <NavBar />
      <main className="shop-main">
        <p className="shop-kicker">
          Kairos Summit <span aria-hidden>·</span> Official merch
        </p>

        <div className="shop-tabs" role="tablist" aria-label="Merch items">
          {SHOP_PRODUCTS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === productId}
              className={`shop-tab ${item.id === productId ? 'shop-tab--active' : ''}`}
              onClick={() => selectProduct(item.id)}
            >
              {item.tabLabel} <span aria-hidden>·</span> {formatNaira(item.price)}
            </button>
          ))}
        </div>

        <section className="shop-layout" aria-label={product.name}>
          <div className="shop-gallery">
            <div className="shop-gallery__main">
              <img
                src={colour.img}
                alt={`${product.name} in ${colour.label}`}
                className="shop-gallery__photo"
              />
            </div>
            <div className="shop-gallery__thumbs">
              {product.colours.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`shop-thumb ${option.id === colourId ? 'shop-thumb--active' : ''}`}
                  onClick={() => setColourId(option.id)}
                  aria-label={`View ${option.label}`}
                  aria-pressed={option.id === colourId}
                >
                  <img src={option.img} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="shop-panel">
            <h1 className="shop-panel__title">{product.name}</h1>
            <p className="shop-panel__tagline">{product.tagline}</p>
            <p className="shop-panel__price">{formatNaira(product.price)}</p>

            {stage === 'done' && placedOrder ? (
              <div className="shop-success">
                <h2 className="shop-success__title">Payment received</h2>
                <p className="shop-success__note">
                  Thank you. We have your order and will reach out on delivery before the summit.
                </p>
                <dl className="shop-success__list">
                  <div>
                    <dt>Reference</dt>
                    <dd>{placedOrder.reference}</dd>
                  </div>
                  <div>
                    <dt>Item</dt>
                    <dd>
                      {placedOrder.item}, {placedOrder.colour}
                      {placedOrder.size ? `, size ${placedOrder.size}` : ''}
                    </dd>
                  </div>
                  <div>
                    <dt>Quantity</dt>
                    <dd>{placedOrder.quantity}</dd>
                  </div>
                  <div>
                    <dt>Paid</dt>
                    <dd>{formatNaira(placedOrder.subtotal)}</dd>
                  </div>
                </dl>
                <button type="button" className="shop-panel__cta" onClick={startAnotherOrder}>
                  Order something else
                </button>
              </div>
            ) : (
              <>
                <div className="shop-field">
                  <p className="shop-field__label">
                    Colour <span className="shop-field__value">{colour.label}</span>
                  </p>
                  <div className="shop-swatches">
                    {product.colours.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        className={`shop-swatch ${option.id === colourId ? 'shop-swatch--active' : ''}`}
                        style={{ background: option.swatch }}
                        onClick={() => setColourId(option.id)}
                        aria-label={option.label}
                        aria-pressed={option.id === colourId}
                      />
                    ))}
                  </div>
                </div>

                {product.sizes.length > 0 && (
                  <div className="shop-field">
                    <p className="shop-field__label">Size *</p>
                    <div className="shop-sizes">
                      {product.sizes.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`shop-size ${option === size ? 'shop-size--active' : ''}`}
                          onClick={() => setSize(option)}
                          aria-pressed={option === size}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="shop-field">
                  <p className="shop-field__label">Quantity</p>
                  <div className="shop-qty">
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      aria-label="Reduce quantity"
                    >
                      −
                    </button>
                    <span>{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => Math.min(20, prev + 1))}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="shop-subtotal">
                  <span>Subtotal</span>
                  <strong>{formatNaira(subtotal)}</strong>
                </div>

                {stage === 'options' ? (
                  <button type="button" className="shop-panel__cta" onClick={handleProceed}>
                    Proceed to Order
                  </button>
                ) : (
                  <form className="shop-checkout" onSubmit={handleCheckout}>
                    <label className="shop-checkout__field">
                      <span>Full name *</span>
                      <input
                        type="text"
                        value={buyer.name}
                        onChange={(e) => updateBuyer('name', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </label>
                    <label className="shop-checkout__field">
                      <span>Email *</span>
                      <input
                        type="email"
                        value={buyer.email}
                        onChange={(e) => updateBuyer('email', e.target.value)}
                        placeholder="you@email.com"
                      />
                    </label>
                    <label className="shop-checkout__field">
                      <span>Phone *</span>
                      <input
                        type="tel"
                        value={buyer.phone}
                        onChange={(e) => updateBuyer('phone', e.target.value)}
                        placeholder="080..."
                      />
                    </label>
                    <label className="shop-checkout__field">
                      <span>Delivery address *</span>
                      <textarea
                        rows={3}
                        value={buyer.address}
                        onChange={(e) => updateBuyer('address', e.target.value)}
                        placeholder="Street, city, state"
                      />
                    </label>
                    <button type="submit" className="shop-panel__cta">
                      {PAYSTACK_PUBLIC_KEY
                        ? `Pay ${formatNaira(subtotal)} with Paystack`
                        : `Send order on WhatsApp, ${formatNaira(subtotal)}`}
                    </button>
                    <button
                      type="button"
                      className="shop-checkout__back"
                      onClick={() => {
                        setStage('options');
                        setFormError('');
                      }}
                    >
                      Back to options
                    </button>
                  </form>
                )}

                {formError && <p className="shop-error">{formError}</p>}
              </>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
      <EventCountdownBar />
    </div>
  );
}

function VolunteerPage() {
  const [form, setForm] = useState({
    title: NAME_TITLES[0],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    skills: '',
    availability: '',
    servedBefore: '',
    note: '',
  });
  const [areas, setAreas] = useState([]);
  const [error, setError] = useState('');
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleArea(area) {
    setAreas((prev) => (prev.includes(area) ? prev.filter((item) => item !== area) : [...prev, area]));
  }

  function buildApplication() {
    const lines = [
      'Kairos Summit volunteer application',
      `Name: ${form.title} ${form.firstName.trim()} ${form.lastName.trim()}`,
      `Email: ${form.email.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.organization.trim() ? `Church / Organisation: ${form.organization.trim()}` : null,
      form.skills.trim() ? `Relevant skills: ${form.skills.trim()}` : null,
      `Preferred areas: ${areas.join(', ')}`,
      `Availability: ${form.availability}`,
      form.servedBefore ? `Volunteered before: ${form.servedBefore}` : null,
      form.note.trim() ? `Note: ${form.note.trim()}` : null,
    ];
    return lines.filter(Boolean).join('\n');
  }

  function openWhatsApp() {
    const url = `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${encodeURIComponent(buildApplication())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('Fill in your name, email and phone number.');
      return;
    }
    if (!areas.length) {
      setError('Pick at least one area you would like to serve in.');
      return;
    }
    if (!form.availability) {
      setError('Let us know how much of the day you are available.');
      return;
    }

    setError('');
    openWhatsApp();
    setIsSent(true);
  }

  return (
    <div className="landing volunteer-page">
      <NavBar />
      <main className="volunteer-main">
        <header className="volunteer-hero">
          <p className="volunteer-hero__kicker">
            Call for volunteers <span aria-hidden>·</span> Remnants Reborn
          </p>
          <h1 className="volunteer-hero__title">Serve at Kairos Summit 2026</h1>
          <p className="volunteer-hero__lead">
            Kairos Summit is calling on willing hands and hearts to serve at Remnants Reborn, our second
            edition in Port Harcourt. If serving is your thing, this is your chance to use your gifts, gain
            experience, and stand with a community of believers building something that lasts.
          </p>
        </header>

        <section className="volunteer-form-section" aria-labelledby="volunteer-form-heading">
          <h2 id="volunteer-form-heading" className="sr-only">Volunteer application</h2>

          {isSent ? (
            <div className="volunteer-sent">
              <h3 className="volunteer-sent__title">Your application is ready</h3>
              <p className="volunteer-sent__note">
                We opened WhatsApp with your details filled in. Press send there and the team will reply on
                the same chat. If the chat did not open, use the button below.
              </p>
              <button type="button" className="volunteer-submit" onClick={openWhatsApp}>
                Open WhatsApp again
              </button>
              <button type="button" className="volunteer-sent__edit" onClick={() => setIsSent(false)}>
                Edit my answers
              </button>
            </div>
          ) : (
            <form className="volunteer-form" onSubmit={handleSubmit}>
              <div className="volunteer-field">
                <span className="volunteer-field__label">Full Name *</span>
                <div className="volunteer-field__row volunteer-field__row--name">
                  <select
                    className="volunteer-input"
                    value={form.title}
                    onChange={(e) => update('title', e.target.value)}
                    aria-label="Title"
                  >
                    {NAME_TITLES.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    className="volunteer-input"
                    placeholder="First Name"
                    aria-label="First name"
                    value={form.firstName}
                    onChange={(e) => update('firstName', e.target.value)}
                  />
                  <input
                    type="text"
                    className="volunteer-input"
                    placeholder="Last Name"
                    aria-label="Last name"
                    value={form.lastName}
                    onChange={(e) => update('lastName', e.target.value)}
                  />
                </div>
              </div>

              <label className="volunteer-field">
                <span className="volunteer-field__label">Email Address *</span>
                <input
                  type="email"
                  className="volunteer-input"
                  placeholder="example@example.com"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                />
              </label>

              <label className="volunteer-field">
                <span className="volunteer-field__label">Phone Number (WhatsApp) *</span>
                <input
                  type="tel"
                  className="volunteer-input"
                  placeholder="(000) 000-0000"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                />
              </label>

              <label className="volunteer-field">
                <span className="volunteer-field__label">Church / Organization</span>
                <input
                  type="text"
                  className="volunteer-input"
                  value={form.organization}
                  onChange={(e) => update('organization', e.target.value)}
                />
              </label>

              <label className="volunteer-field">
                <span className="volunteer-field__label">Relevant Skills</span>
                <input
                  type="text"
                  className="volunteer-input"
                  value={form.skills}
                  onChange={(e) => update('skills', e.target.value)}
                />
              </label>

              <fieldset className="volunteer-field volunteer-choice">
                <legend className="volunteer-field__label">Preferred Volunteer Areas *</legend>
                <div className="volunteer-choice__grid">
                  {VOLUNTEER_AREAS.map((area) => (
                    <label className="volunteer-choice__item" key={area}>
                      <input
                        type="checkbox"
                        checked={areas.includes(area)}
                        onChange={() => toggleArea(area)}
                      />
                      <span>{area}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="volunteer-field volunteer-choice">
                <legend className="volunteer-field__label">Availability to Volunteer *</legend>
                <div className="volunteer-choice__grid">
                  {VOLUNTEER_AVAILABILITY.map((slot) => (
                    <label className="volunteer-choice__item" key={slot}>
                      <input
                        type="radio"
                        name="volunteer-availability"
                        checked={form.availability === slot}
                        onChange={() => update('availability', slot)}
                      />
                      <span>{slot}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="volunteer-field">
                <legend className="volunteer-field__label">Have you volunteered with Kairos Summit before?</legend>
                <div className="volunteer-toggle">
                  {['Yes', 'No'].map((answer) => (
                    <button
                      type="button"
                      key={answer}
                      className={`volunteer-toggle__btn ${form.servedBefore === answer ? 'volunteer-toggle__btn--active' : ''}`}
                      aria-pressed={form.servedBefore === answer}
                      onClick={() => update('servedBefore', answer)}
                    >
                      {answer}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="volunteer-field">
                <span className="volunteer-field__label">
                  Please share any previous volunteer experience or tell us why you'd like to volunteer.
                </span>
                <textarea
                  className="volunteer-input volunteer-input--area"
                  rows={5}
                  value={form.note}
                  onChange={(e) => update('note', e.target.value)}
                />
              </label>

              {error ? <p className="volunteer-error" role="alert">{error}</p> : null}

              <button type="submit" className="volunteer-submit">Submit Application</button>
            </form>
          )}
        </section>
      </main>
      <SiteFooter />
      <EventCountdownBar />
    </div>
  );
}

const REGISTER_STORAGE_KEY = 'kairos_rr_seat_2026';

function makeSeatCode(firstName, lastName) {
  const first = (firstName.trim()[0] || 'K').toUpperCase();
  const last = (lastName.trim()[0] || 'S').toUpperCase();
  const n = String(((firstName.trim().length * 13) + (lastName.trim().length * 7) + 26) % 90 + 10);
  return `RR26-${first}${last}${n}`;
}

function RegisterPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    occupation: '',
    city: '',
    heardFrom: '',
  });
  const [ticket, setTicket] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      const saved = window.localStorage.getItem(REGISTER_STORAGE_KEY);
      if (saved) setTicket(JSON.parse(saved));
    } catch {
      setTicket(null);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const occupation = form.occupation.trim();
    const comingFrom = form.city.trim() || 'Port Harcourt';
    const whoToldYou = form.heardFrom.trim();

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(REGISTER_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          occupation,
          comingFrom,
          whoToldYou,
        }),
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(
          payload?.message || payload?.error || 'Could not add your name. Try again.'
        );
      }

      const saved = payload?.data || payload || {};
      const nextTicket = {
        name: `${saved.firstName || firstName} ${saved.lastName || lastName}`.replace(/\s+/g, ' '),
        email: saved.email || email,
        phone: saved.phone || phone,
        occupation: saved.occupation || occupation,
        city: saved.comingFrom || comingFrom,
        heardFrom: saved.whoToldYou || whoToldYou,
        code: saved.code || saved.id || makeSeatCode(firstName, lastName),
      };
      setTicket(nextTicket);
      try {
        window.localStorage.setItem(REGISTER_STORAGE_KEY, JSON.stringify(nextTicket));
      } catch {
        /* ignore full storage */
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Could not add your name. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetTicket = () => {
    setTicket(null);
    try {
      window.localStorage.removeItem(REGISTER_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="landing register-page">
      <NavBar />
      <main className="register-main">
        <div className="register-desk">
          <aside className="register-desk__stage" aria-hidden={false}>
            <img
              src={remnantsRebornBanner}
              alt="Remnants Reborn, Kairos Summit, 14 November 2026 at Celebr8 Centre"
              className="register-desk__poster"
            />
            <div className="register-desk__stage-fade" aria-hidden />
            <p className="register-desk__stage-note">
              Celebr8 Centre, Olu Obasanjo Road
              <span>Saturday 14 November 2026 · 10:00 AM</span>
            </p>
          </aside>

          <section className="register-desk__paper" aria-labelledby="register-heading">
            <p className="register-desk__running">
              Kairos Summit
              <span aria-hidden>·</span>
              Seat list
              <span aria-hidden>·</span>
              Port Harcourt
            </p>

            {ticket ? (
              <div className="register-ticket" role="status">
                <div className="register-ticket__stub">
                  <p className="register-ticket__event">Remnants Reborn</p>
                  <p className="register-ticket__code">{ticket.code}</p>
                </div>
                <div className="register-ticket__body">
                  <p className="register-ticket__kicker">On the door list</p>
                  <h1 id="register-heading" className="register-ticket__name">{ticket.name}</h1>
                  <p className="register-ticket__copy">
                    Saturday 14 November, 10 in the morning. Celebr8 Centre, Olu Obasanjo Road.
                    If the plan shifts, we will write {ticket.email}.
                  </p>
                  <dl className="register-ticket__meta">
                    <div>
                      <dt>Phone</dt>
                      <dd>{ticket.phone}</dd>
                    </div>
                    <div>
                      <dt>Coming from</dt>
                      <dd>{ticket.city}</dd>
                    </div>
                    {ticket.occupation ? (
                      <div>
                        <dt>Occupation</dt>
                        <dd>{ticket.occupation}</dd>
                      </div>
                    ) : null}
                  </dl>
                  <button type="button" className="register-ticket__again" onClick={resetTicket}>
                    Register someone else
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 id="register-heading" className="register-desk__title">
                  Take a seat.
                </h1>
                <p className="register-desk__lead">
                  Write your name here if you are coming on Saturday. This is the list we will use at Celebr8, not WhatsApp, not a story reply.
                </p>

                <form className="register-sheet" onSubmit={handleSubmit}>
                  <div className="register-sheet__rule" aria-hidden />
                  <div className="register-sheet__row">
                    <label className="register-sheet__field">
                      <span>First name</span>
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        autoComplete="given-name"
                        required
                      />
                    </label>
                    <label className="register-sheet__field">
                      <span>Last name</span>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        autoComplete="family-name"
                        required
                      />
                    </label>
                  </div>
                  <label className="register-sheet__field">
                    <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                    />
                  </label>
                  <label className="register-sheet__field">
                    <span>Phone <em>WhatsApp preferred</em></span>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      required
                    />
                  </label>
                  <label className="register-sheet__field">
                    <span>Occupation</span>
                    <input
                      type="text"
                      name="occupation"
                      value={form.occupation}
                      onChange={handleChange}
                      autoComplete="organization-title"
                      required
                    />
                  </label>
                  <div className="register-sheet__row">
                    <label className="register-sheet__field">
                      <span>Coming from</span>
                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="Port Harcourt"
                        autoComplete="address-level2"
                      />
                    </label>
                    <label className="register-sheet__field">
                      <span>Who told you? <em>optional</em></span>
                      <input
                        type="text"
                        name="heardFrom"
                        value={form.heardFrom}
                        onChange={handleChange}
                        placeholder="A friend, church, Instagram…"
                      />
                    </label>
                  </div>
                  {submitError ? (
                    <p className="register-sheet__error" role="alert">{submitError}</p>
                  ) : null}
                  <button type="submit" className="register-sheet__submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding your name…' : 'Get tickets'}
                  </button>
                </form>

                <ul className="register-aside">
                  <li>Doors from 10:00. Come early if you want a seat near the front.</li>
                  <li>Last June this hall filled up. Write your name if you want a place this time.</li>
                </ul>
              </>
            )}
          </section>
        </div>
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
      <Route path="/speakers" element={<SpeakersPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/volunteer" element={<VolunteerPage />} />
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
          <Link to="/register" className="btn btn--primary">
            Get tickets
            <svg
              className="btn__icon btn__icon--send"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M22 2 11 13" />
              <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
            </svg>
          </Link>
          <Link to="/volunteer" className="btn btn--gold">Volunteer</Link>
        </div>
        <Link to="/register" className="hero__event-box">
          <div className="hero__event-media">
            <img src={remnantsRebornBanner} alt="Remnants Reborn event flier" className="hero__event-thumb" />
          </div>
          <div className="hero__event-text">
            <p className="hero__event-title">
              <span className="hero__event-label">Upcoming major event</span>{' '}
              <span className="hero__event-name">Remnants Reborn</span>
            </p>
            <p className="hero__event-meta">14 November 2026 · Port Harcourt</p>
            <span className="hero__event-action">Get tickets</span>
          </div>
        </Link>
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

      {/* ----- KAIROS IN NUMBERS ----- */}
      <section className="numbers" id="numbers" aria-labelledby="numbers-heading">
        <div className="numbers__inner">
          <h2 id="numbers-heading" className="numbers__label">Kairos Summit in numbers</h2>
          <div className="numbers__grid">
            {KAIROS_NUMBERS.map(({ value, label }) => (
              <div className="numbers__item" key={label}>
                <span className="numbers__value">{value}</span>
                <span className="numbers__caption">{label}</span>
              </div>
            ))}
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
        <span className="tag">Highlight</span>
        <h2 className="section__title news__title">
          New at <span className="highlight-gold">Kairos</span>? We're ready to help!
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
      <EventCountdownBar />
    </div>
      } />
    </Routes>
  );
}

export default App;
