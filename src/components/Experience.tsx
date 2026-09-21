import { motion } from 'framer-motion'
import { Briefcase, MapPin, Calendar } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { experience } from '../lib/data'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've Worked"
        subtitle="Real-world internships spanning data analytics and IoT development."
      />

      <div className="mx-auto max-w-4xl relative">
        {/* Timeline line */}
        <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary-bright/50 to-transparent" />

        <div className="space-y-10">
          {experience.map((e, i) => (
            <Reveal key={e.role + e.company} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="relative grid sm:grid-cols-2 gap-6 sm:gap-10 items-start"
              >
                {/* Dot */}
                <span
                  className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-3 size-4 rounded-full bg-gradient-to-br from-primary-bright to-accent shadow-[0_0_18px_rgba(34,211,238,0.7)] ring-4 ring-bg"
                />

                {/* Left meta on desktop, full-width on mobile */}
                <div className="pl-12 sm:pl-0 sm:text-right sm:pr-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-border text-xs font-mono text-primary-bright">
                    <Briefcase size={12} /> {e.period}
                  </div>
                  <div className="mt-3 flex sm:justify-end items-center gap-2 text-sm text-muted">
                    <MapPin size={14} className="text-primary-bright" />
                    {e.location}
                  </div>
                </div>

                {/* Right card */}
                <div className="pl-12 sm:pl-0">
                  <div className="glass rounded-2xl p-6 hover:border-primary-bright/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.18)] transition-all">
                    <h3 className="font-display font-semibold text-xl text-text-strong">
                      {e.role}
                    </h3>
                    <div className="text-sm text-primary-bright mt-1">
                      @ {e.company}
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-text/90">
                      {e.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="mt-2 size-1.5 rounded-full bg-primary-bright flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 text-center text-sm text-muted">
            <Calendar size={14} className="inline -mt-1 mr-2 text-primary-bright" />
            Currently seeking new internship and entry-level opportunities.
          </div>
        </Reveal>
      </div>
    </section>
  )
}