import { motion } from 'framer-motion'
import { ArrowDown, Mail, Github, Linkedin, Download, MapPin } from 'lucide-react'
import TypingEffect from './TypingEffect'
import Reveal from './Reveal'
import { personal } from '../lib/data'
import { downloadResume } from '../lib/resume'
import { openExternal, openMail } from '../lib/actions'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-20 px-4 sm:px-6 overflow-hidden">
      {/* Decorative grid + blobs */}
      <div className="absolute inset-0 -z-10 bg-grid opacity-60" />
      <div className="absolute -top-32 -left-32 size-[480px] rounded-full bg-primary/20 blur-[120px] -z-10" />
      <div className="absolute bottom-0 -right-32 size-[520px] rounded-full bg-accent/20 blur-[140px] -z-10" />

      <div className="mx-auto max-w-7xl w-full grid lg:grid-cols-12 gap-12 items-center">
        {/* Left: Copy */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-border text-xs font-mono text-primary-bright mb-7">
              <span className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-primary-bright animate-ping opacity-75" />
                <span className="relative rounded-full size-2 bg-primary-bright" />
              </span>
              Available for opportunities
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="font-mono text-sm sm:text-base text-primary-bright mb-3 tracking-wide">
              Hi, I'm
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-display font-bold text-text-strong leading-[0.95] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              {personal.name}
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-5 text-2xl sm:text-3xl md:text-4xl font-display font-medium">
              <span className="text-muted">I'm a </span>
              <span className="text-gradient">
                <TypingEffect strings={personal.roles} />
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted leading-relaxed">
              {personal.tagline} Based in {personal.location}, I build responsive web apps,
              craft Power BI dashboards and explore modern software engineering.
            </p>
          </Reveal>

          <Reveal delay={0.34}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#projects" className="btn-primary">
                View Projects <ArrowDown size={16} />
              </a>
              <a href="#contact" className="btn-ghost">
                <Mail size={16} /> Contact Me
              </a>
              <button onClick={downloadResume} className="btn-ghost">
                <Download size={16} /> Download Resume
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.42}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-primary-bright" />
                {personal.location}
              </div>
              <div className="flex items-center gap-3 ml-auto">
                <button type="button" onClick={() => openExternal(personal.github)} aria-label="GitHub"
                   className="size-10 grid place-items-center rounded-full glass border border-border hover:border-primary-bright/60 hover:text-text-strong transition-all hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]">
                  <Github size={16} />
                </button>
                <button type="button" onClick={() => openExternal(personal.linkedin)} aria-label="LinkedIn"
                   className="size-10 grid place-items-center rounded-full glass border border-border hover:border-primary-bright/60 hover:text-text-strong transition-all hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]">
                  <Linkedin size={16} />
                </button>
                <button type="button" onClick={() => openMail({ to: personal.email })} aria-label="Email"
                   className="size-10 grid place-items-center rounded-full glass border border-border hover:border-primary-bright/60 hover:text-text-strong transition-all hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]">
                  <Mail size={16} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: Portrait */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Spinning rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 -m-8 rounded-full border border-dashed border-primary-bright/25"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 -m-16 rounded-full border border-dashed border-accent/20"
            />
            {/* Floating dots */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-3 -right-3 size-5 rounded-full bg-primary-bright shadow-[0_0_22px_rgba(34,211,238,0.8)]"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-4 size-3 rounded-full bg-accent shadow-[0_0_18px_rgba(59,130,246,0.8)]"
            />

            <div className="relative size-[300px] sm:size-[360px] md:size-[420px] rounded-full overflow-hidden glass-strong glow-cyan animate-glow">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-bright/30 via-accent/20 to-accent-2/30" />
              <img
                src="/images/nitil-portrait.png"
                alt={`${personal.name} — portrait`}
                className="relative w-full h-full object-cover rounded-full"
                loading="eager"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-6 sm:left-2 top-1/4 glass-strong rounded-2xl px-4 py-3 border border-border"
            >
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                <span className="text-xs font-mono text-text-strong">B.Tech IT · 2027</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="absolute -right-6 sm:-right-2 bottom-10 glass-strong rounded-2xl px-4 py-3 border border-border"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <span className="text-xs font-mono text-text-strong">Power BI Intern</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted hover:text-primary-bright transition-colors"
        aria-label="Scroll to about"
      >
        <span className="text-xs font-mono tracking-widest">SCROLL</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  )
}