import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { skills } from '../lib/data'

export default function Skills() {
  return (
    <section id="skills" className="section relative">
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" />
      <SectionHeading
        eyebrow="Tech Stack"
        title="Skills & Tools"
        subtitle="The languages, frameworks and concepts I use to build modern software and data products."
      />

      <div className="mx-auto max-w-6xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {skills.map((s, i) => {
          const Icon = s.icon
          return (
            <Reveal key={s.name} delay={i * 0.04}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                className="group relative glass rounded-2xl p-5 cursor-default overflow-hidden"
                style={{
                  ['--c' as any]: s.color,
                }}
              >
                {/* Glow on hover */}
                <div
                  className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
                  style={{ background: `radial-gradient(120% 120% at 50% 0%, ${s.color}55, transparent 60%)` }}
                />
                <div
                  className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/10 transition-colors"
                  style={{ boxShadow: `inset 0 0 0 1px transparent` }}
                />

                <div className="relative flex flex-col items-start gap-3">
                  <div
                    className="size-11 grid place-items-center rounded-xl border border-white/10 transition-all group-hover:shadow-[0_0_24px_var(--c)]"
                    style={{ background: `${s.color}1A`, color: s.color }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-text-strong text-sm md:text-base">
                      {s.name}
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted mt-0.5">
                      {s.category}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}