import { motion } from 'framer-motion'
import { GraduationCap, BookOpen, Calendar } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { education } from '../lib/data'

export default function Education() {
  return (
    <section id="education" className="section">
      <SectionHeading
        eyebrow="Education"
        title="Academic Path"
        subtitle="The foundation that shapes my engineering thinking."
      />

      <div className="mx-auto max-w-4xl">
        {education.map((ed, i) => (
          <Reveal key={ed.degree} delay={i * 0.05}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="relative glass rounded-3xl p-7 md:p-9 overflow-hidden group"
            >
              <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(60% 80% at 50% 0%, ${ed.accent}22, transparent 70%)` }}
              />

              <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                <div
                  className="size-16 md:size-20 grid place-items-center rounded-2xl border border-white/10 flex-shrink-0"
                  style={{ background: `${ed.accent}1A`, color: ed.accent, boxShadow: `0 0 24px ${ed.accent}33` }}
                >
                  <GraduationCap size={32} />
                </div>

                <div className="flex-1">
                  <h3 className="font-display font-semibold text-2xl md:text-3xl text-text-strong">
                    {ed.degree}
                  </h3>
                  <div className="mt-2 text-primary-bright">{ed.school}</div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-border text-xs font-mono text-text">
                      <Calendar size={12} className="text-primary-bright" />
                      {ed.period}
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-border text-xs font-mono text-text">
                      <BookOpen size={12} className="text-primary-bright" />
                      {ed.detail}
                    </span>
                  </div>
                </div>

                {ed.score && (
                  <div className="block text-right md:min-w-[120px] md:ml-auto">
                    <div className="font-display text-5xl font-bold text-gradient">
                      {ed.score}
                    </div>
                    <div className="text-xs font-mono text-muted uppercase tracking-widest mt-1">
                      {ed.scoreLabel || 'Score'}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}