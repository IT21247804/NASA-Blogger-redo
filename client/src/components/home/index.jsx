import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import Typewriter from 'typewriter-effect';
import mainpic from '../images/mainpic.jpg';
import mainpic2 from '../images/mainpic2.jpg';

const techLogos = [
  { name: 'React', href: 'https://reactjs.org/', logo: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Firebase', href: 'https://firebase.google.com/', logo: 'https://cdn.simpleicons.org/firebase/FFCA28' },
  { name: 'Firestore', href: 'https://firebase.google.com/docs/firestore', logo: 'https://cdn.simpleicons.org/googlecloud/4285F4' },
  { name: 'Tailwind CSS', href: 'https://tailwindcss.com/', logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'Material UI', href: 'https://mui.com/', logo: 'https://cdn.simpleicons.org/mui/007FFF' },
  { name: 'Git', href: 'https://git-scm.com/', logo: 'https://cdn.simpleicons.org/git/F05032' },
  { name: 'GitHub', href: 'https://github.com/', logo: 'https://cdn.simpleicons.org/github/FFFFFF' },
];

const revealClasses =
  'opacity-0 translate-y-8 transition-all duration-700 will-change-transform';

const Home = () => {
  const { currentUser } = useAuth();
  const [dynamicText, setDynamicText] = useState('Hello Explorer');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const nameOrEmail = currentUser?.displayName || currentUser?.email;
    setDynamicText(nameOrEmail ? `Hello ${nameOrEmail}` : 'Hello Explorer');
  }, [currentUser]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const heroParallaxStyle = useMemo(
    () => ({ transform: `translate3d(0, ${scrollY * 0.25}px, 0) scale(1.08)` }),
    [scrollY]
  );

  const handleScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative overflow-x-hidden text-white">
      <section className="relative min-h-screen">
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <img
            src={mainpic}
            alt="NASA Blogger hero background"
            className="h-full w-full object-cover will-change-transform"
            style={heroParallaxStyle}
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-slate-900/80 to-black/90" />

        <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-16 text-center">
          <p
            data-reveal
            className={`mb-5 rounded-full border border-white/30 bg-black/30 px-4 py-1 text-xs uppercase tracking-[0.2em] text-slate-200 ${revealClasses}`}
          >
            Assignment 2 - SE3040
          </p>

          <h1
            data-reveal
            className={`mb-4 text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl ${revealClasses}`}
          >
            <span className="text-red-500">NASA</span>{' '}
            <span className="text-blue-500">Blogger</span>
          </h1>

          <div
            data-reveal
            className={`mx-auto mb-8 max-w-3xl text-base font-semibold sm:text-2xl ${revealClasses}`}
          >
            <Typewriter
              options={{
                strings: [
                  `${dynamicText}`,
                  'Discover the Astronomy Picture of the Day',
                  'Explore Earth views from space',
                  'Browse Mars rover captures',
                  'Read and publish space-inspired blogs',
                ],
                autoStart: true,
                loop: true,
                delay: 45,
              }}
            />
          </div>

          <div data-reveal className={`flex flex-wrap items-center justify-center gap-4 ${revealClasses}`}>
            <button
              onClick={() => handleScrollTo('project-setting')}
              className="rounded-md border border-purple-700 bg-transparent px-5 py-2 text-sm font-semibold transition hover:bg-purple-700"
            >
              Project Setting
            </button>
            <button
              onClick={() => handleScrollTo('technologies')}
              className="rounded-md border border-white/40 bg-black/30 px-5 py-2 text-sm font-semibold transition hover:bg-white/10"
            >
              Technologies
            </button>
            <a
              href="/Assignment%2002.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-sky-400/70 bg-sky-500/10 px-5 py-2 text-sm font-semibold transition hover:bg-sky-500/20"
            >
              View Assignment PDF
            </a>
          </div>
        </div>
      </section>

      <section id="project-setting" className="relative">
        <div className="absolute inset-0 -z-20">
          <img
            src={mainpic2}
            alt="Project setting background"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/75 via-slate-900/85 to-black/90" />

        <div className="mx-auto max-w-6xl px-4 py-20">
          <article
            data-reveal
            className={`rounded-2xl border border-white/20 bg-black/40 p-6 shadow-2xl backdrop-blur-sm sm:p-8 ${revealClasses}`}
          >
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Project Setting</h2>
            <p className="mb-6 max-w-3xl text-slate-200">
              This web application is developed for SE3040 Assignment 02 as a NASA-themed blogging platform where
              users can explore space data, authenticate securely, and publish blog content.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-white/15 bg-black/30 p-4">
                <h3 className="mb-2 text-lg font-semibold">Core Modules</h3>
                <p className="text-sm text-slate-200">APOD, Earth Imagery, Mars Rover Gallery, and community blogging.</p>
              </div>
              <div className="rounded-lg border border-white/15 bg-black/30 p-4">
                <h3 className="mb-2 text-lg font-semibold">Authentication</h3>
                <p className="text-sm text-slate-200">Firebase Auth with protected pages and user-based personalization.</p>
              </div>
              <div className="rounded-lg border border-white/15 bg-black/30 p-4">
                <h3 className="mb-2 text-lg font-semibold">Data Layer</h3>
                <p className="text-sm text-slate-200">Firestore-backed blog posts with responsive, modern React UI.</p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/Assignment%2002.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-white/40 bg-black/30 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
              >
                Open Assignment in Browser
              </a>
              <a
                href="/Assignment%2002.pdf"
                download
                className="rounded-md border border-sky-400/70 bg-sky-500/10 px-4 py-2 text-sm font-semibold transition hover:bg-sky-500/20"
              >
                Download Assignment PDF
              </a>
            </div>
          </article>
        </div>
      </section>

      <section id="technologies" className="relative">
        <div className="absolute inset-0 -z-20">
          <img
            src={mainpic}
            alt="Technologies background"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-slate-900/85 to-black/95" />

        <div className="mx-auto max-w-6xl px-4 py-20">
          <article
            data-reveal
            className={`rounded-2xl border border-white/20 bg-black/40 p-6 shadow-2xl backdrop-blur-sm sm:p-8 ${revealClasses}`}
          >
            <h2 className="mb-3 text-2xl font-bold sm:text-3xl">Technologies</h2>
            <p className="mb-6 text-slate-200">Built with modern frontend tools and cloud services for performance, scale, and maintainability.</p>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
              {techLogos.map((tech) => (
                <a
                  key={tech.name}
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={tech.name}
                  className="group flex flex-col items-center justify-center gap-2 rounded-lg border border-white/15 bg-black/30 p-4 transition hover:border-white/50 hover:bg-white/10"
                >
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="h-8 w-8 object-contain transition group-hover:scale-110"
                  />
                  <span className="text-xs font-medium text-slate-100">{tech.name}</span>
                </a>
              ))}
            </div>
          </article>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-semibold text-slate-100">Pasan Baddewithana</p>
            <p className="text-sm text-slate-300">IT21247804</p>
          </div>
          <a
            href="mailto:IT21247804@my.sliit.lk"
            className="text-sm text-sky-300 underline underline-offset-4 transition hover:text-sky-200"
          >
            baddewithanapasan@gmail.com
          </a>
        </div>
      </footer>
    </main>
  );
};

export default Home;
