import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import Typewriter from 'typewriter-effect';
import mainpic from '../images/mainpic.jpg';

const techLogos = [
  { name: 'React', href: 'https://reactjs.org/', logo: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Firebase', href: 'https://firebase.google.com/', logo: 'https://cdn.simpleicons.org/firebase/FFCA28' },
  { name: 'Firestore', href: 'https://firebase.google.com/docs/firestore', logo: 'https://cdn.simpleicons.org/googlecloud/4285F4' },
  { name: 'Tailwind CSS', href: 'https://tailwindcss.com/', logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'Material UI', href: 'https://mui.com/', logo: 'https://cdn.simpleicons.org/mui/007FFF' },
  { name: 'Git', href: 'https://git-scm.com/', logo: 'https://cdn.simpleicons.org/git/F05032' },
  { name: 'GitHub', href: 'https://github.com/', logo: 'https://cdn.simpleicons.org/github/FFFFFF' },
];

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

  const parallaxStyle = useMemo(
    () => ({ transform: `translate3d(0, ${scrollY * 0.3}px, 0) scale(1.08)` }),
    [scrollY]
  );

  const handleGetStartedClick = () => {
    document.getElementById('project-details')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative overflow-x-hidden text-white">
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <img
          src={mainpic}
          alt="NASA Blogger Background"
          className="h-full w-full object-cover will-change-transform"
          style={parallaxStyle}
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-slate-900/80 to-black/90" />

      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-16 text-center">
        <p
          data-reveal
          data-aos="fade-up"
          className="mb-4 rounded-full border border-white/30 bg-black/30 px-4 py-1 text-xs uppercase tracking-[0.2em] text-slate-200 opacity-0 translate-y-8 transition-all duration-700"
        >
          Assignment 2 - SE3040
        </p>

        <h1
          data-reveal
          data-aos="zoom-in"
          className="mb-4 text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl opacity-0 translate-y-8 transition-all duration-700"
        >
          <span className="text-red-500">NASA</span> <span className="text-blue-500">Blogger</span>
        </h1>

        <div
          data-reveal
          data-aos="fade-up"
          className="mx-auto mb-8 max-w-3xl text-base font-semibold sm:text-2xl opacity-0 translate-y-8 transition-all duration-700"
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

        <div data-reveal data-aos="fade-up" className="flex flex-wrap items-center justify-center gap-4 opacity-0 translate-y-8 transition-all duration-700">
          <button
            onClick={handleGetStartedClick}
            className="rounded-md border border-purple-700 bg-transparent px-5 py-2 text-sm font-semibold transition hover:bg-purple-700"
          >
            Project Details
          </button>
          <a
            href="#project-details"
            className="rounded-md border border-white/40 bg-black/30 px-5 py-2 text-sm font-semibold transition hover:bg-white/10"
          >
            Explore
          </a>
        </div>
      </section>

      <section id="project-details" className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-6 lg:grid-cols-3">
          <article
            data-reveal
            data-aos="fade-right"
            className="rounded-xl border border-white/20 bg-black/35 p-6 backdrop-blur-sm opacity-0 translate-y-8 transition-all duration-700"
          >
            <h2 className="mb-3 text-2xl font-bold">Project</h2>
            <p className="text-slate-200">Assignment 2</p>
            <p className="text-slate-200">Application Framework (SE3040)</p>
            <p className="mt-3 text-sm text-slate-300">A modern NASA-themed web experience built with React.</p>
          </article>

          <article
            data-reveal
            data-aos="fade-up"
            className="rounded-xl border border-white/20 bg-black/35 p-6 backdrop-blur-sm opacity-0 translate-y-8 transition-all duration-700"
          >
            <h2 className="mb-4 text-2xl font-bold">Tech Stack</h2>
            <div className="grid grid-cols-4 gap-4">
              {techLogos.map((tech) => (
                <a
                  key={tech.name}
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={tech.name}
                  className="group flex items-center justify-center rounded-lg border border-white/15 bg-black/25 p-3 transition hover:border-white/50 hover:bg-white/10"
                >
                  <img src={tech.logo} alt={tech.name} className="h-8 w-8 object-contain transition group-hover:scale-110" />
                </a>
              ))}
            </div>
          </article>

          <article
            data-reveal
            data-aos="fade-left"
            className="rounded-xl border border-white/20 bg-black/35 p-6 backdrop-blur-sm opacity-0 translate-y-8 transition-all duration-700"
          >
            <h2 className="mb-3 text-2xl font-bold">Student</h2>
            <p className="text-slate-200">Baddewithana P</p>
            <p className="text-slate-200">IT21247804</p>
            <p className="mt-1 text-slate-200">
              <a href="mailto:IT21247804@my.sliit.lk" className="underline underline-offset-4 hover:text-sky-300">
                IT21247804@my.sliit.lk
              </a>
            </p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Home;
