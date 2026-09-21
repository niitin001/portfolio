import { motion } from 'framer-motion'
import { Github, ArrowUpRight, Sparkles, ExternalLink, Clock3, ImageIcon } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { projects } from '../lib/data'
import { openExternal } from '../lib/actions'

export default function Projects() {
  return (
    <section id="projects" className="section relative">
      <SectionHeading
        eyebrow="Portfolio"
        title="Featured Projects"
        subtitle="Live demos, source code and concise build notes from my web development work."
      />

      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-6 lg:gap-8">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <motion.article
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="group relative glass rounded-3xl overflow-hidden h-full flex flex-col"
            >
              <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${p.gradient}`}>
                {p.image ? (
                  <img
                    src={p.image}
                    alt={`${p.title} screenshot`}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-grid opacity-40" />
                    <div className="absolute inset-0 grid place-items-center">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                        className="size-44 rounded-full border border-white/10"
                        style={{ borderColor: `${p.accent}55` }}
                      />
                      <div className="absolute grid place-items-center size-24 rounded-2xl glass-strong border border-white/15"
                           style={{ boxShadow: `0 0 40px ${p.accent}55` }}>
                        <ImageIcon size={28} style={{ color: p.accent }} />
                      </div>
                    </div>
                  </>
                )}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg/85 to-transparent" />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-full glass border border-border text-[10px] font-mono uppercase tracking-widest text-text-strong">
                    Web App
                  </span>
                  {p.demoStatus === 'live' && (
                    <span className="px-2.5 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/15 text-[10px] font-mono uppercase tracking-widest text-emerald-300">
                      Live Demo
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 md:p-7 flex-1 flex flex-col">
                <div className="text-xs font-mono text-primary-bright tracking-wider">
                  {p.subtitle}
                </div>
                <h3 className="mt-1 font-display font-semibold text-2xl text-text-strong group-hover:text-gradient transition-colors">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {p.description}
                </p>

                <ul className="mt-5 space-y-2 text-sm text-text">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="mt-2 size-1.5 rounded-full bg-primary-bright flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-md text-xs font-mono glass border border-border text-primary-bright">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {p.liveDemo ? (
                    <button
                      type="button"
                      onClick={() => openExternal(p.liveDemo!)}
                      className="btn-primary !py-2 !px-4 text-sm"
                    >
                      <ExternalLink size={15} /> Live Demo
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-sm text-muted">
                      <Clock3 size={15} /> Demo coming soon
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => openExternal(p.github)}
                    className="btn-ghost !py-2 !px-4 text-sm"
                  >
                    <Github size={15} /> GitHub
                  </button>
                  <button
                    type="button"
                    onClick={() => openExternal(p.liveDemo || p.github)}
                    aria-label={`Open ${p.title}`}
                    className="size-10 grid place-items-center rounded-full glass border border-border hover:border-primary-bright/60 hover:text-text-strong transition-all hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]"
                  >
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>

              <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(60% 80% at 50% 0%, ${p.accent}22, transparent 70%)` }}
              />
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
