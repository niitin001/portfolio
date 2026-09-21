import { motion } from 'framer-motion'
import { Sparkles, Target, Rocket } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { aboutStats, personal } from '../lib/data'

export default function About() {
  return (
    <section id="about" className="section">
      <SectionHeading
        eyebrow="About Me"
        title="Who I Am"
        subtitle="A curious developer with a passion for clean code, beautiful UI and meaningful data."
      />

      <div className="mx-auto max-w-6xl grid lg:grid-cols-12 gap-8">
        <Reveal className="lg:col-span-7">
          <div className="glass rounded-3xl p-7 md:p-9 h-full">
            <p className="text-text leading-relaxed text-base md:text-lg">
              {personal.intro}
            </p>
            <p className="mt-5 text-muted leading-relaxed">
              Currently pursuing my B.Tech in Information Technology at Bansal Institute of
              Science & Technology, Bhopal. I've completed internships in Power BI at CodeAlpha
              and Internet of Things at Emertxe, shipped production-ready web projects and earned
              certifications across programming fundamentals, databases and emerging technologies.
              I love learning fast and shipping things that matter.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {['Clean code', 'Responsive UI', 'Data visualization', 'Performance', 'Accessibility'].map((t) => (
                <span key={t} className="px-3 py-1 rounded-full text-xs font-mono glass border border-border text-primary-bright">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {aboutStats.map((s, i) => (
            <Reveal key={s.label} delay={0.05 * i} className={i === 0 || i === 3 ? 'col-span-2 sm:col-span-1' : ''}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-3xl p-5 md:p-6 h-full flex flex-col justify-between group hover:border-primary-bright/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] transition-all"
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient">
                  {s.value}
                </div>
                <div className="mt-2 text-xs md:text-sm text-muted uppercase tracking-wider font-mono">
                  {s.label}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Values row */}
      <div className="mx-auto max-w-6xl mt-10 grid sm:grid-cols-3 gap-4">
        {[
          { icon: Target,   title: 'Focused',  desc: 'On outcomes that move the needle — for users and for learning.' },
          { icon: Sparkles, title: 'Craft',     desc: 'Polished interfaces, performant code, accessible defaults.' },
          { icon: Rocket,   title: 'Momentum',  desc: 'Ship fast, iterate faster, learn from every release.' },
        ].map((v, i) => (
          <Reveal key={v.title} delay={0.05 * i}>
            <div className="glass rounded-2xl p-5 h-full hover:border-primary-bright/50 hover:-translate-y-1 transition-all">
              <div className="size-10 grid place-items-center rounded-xl bg-gradient-to-br from-primary-bright/20 to-accent/20 border border-border mb-4">
                <v.icon size={18} className="text-primary-bright" />
              </div>
              <div className="font-display font-semibold text-text-strong">{v.title}</div>
              <div className="text-sm text-muted mt-1">{v.desc}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}