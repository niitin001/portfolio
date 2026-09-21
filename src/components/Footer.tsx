import { ArrowUp } from 'lucide-react'
import { personal, socials } from '../lib/data'
import { Github, Linkedin, Mail, Phone } from 'lucide-react'
import { openExternal, openMail } from '../lib/actions'

const iconMap: Record<string, any> = {
  github: Github, linkedin: Linkedin, mail: Mail, phone: Phone,
}

export default function Footer() {
  const year = new Date().getFullYear()
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative px-4 sm:px-6 pb-6 pt-4">
      <div className="divider-glow mb-8" />
      <div className="mx-auto max-w-7xl">
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid place-items-center size-10 rounded-xl bg-gradient-to-br from-primary-bright to-accent text-bg font-display font-bold text-lg shadow-[0_0_18px_rgba(34,211,238,0.45)]">
                N
              </span>
              <span className="font-display font-semibold text-text-strong">{personal.name}</span>
            </div>
            <p className="mt-4 text-sm text-muted max-w-xs leading-relaxed">
              Aspiring software developer crafting clean code, beautiful UI and meaningful data stories.
            </p>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-muted mb-3">Quick Links</div>
            <div className="flex flex-col gap-2 text-sm">
              {['projects', 'experience', 'contact'].map((id) => (
                <a key={id} href={`#${id}`} className="text-text hover:text-primary-bright transition-colors capitalize">
                  {id}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-muted mb-3">Connect</div>
            <div className="flex items-center gap-3">
              {socials.map((s) => {
                const Icon = iconMap[s.icon]
                const isHttp = s.href.startsWith('http')
                const onClick = () => {
                  if (isHttp) openExternal(s.href)
                  else if (s.icon === 'mail') openMail({ to: personal.email })
                }
                return (
                  <button key={s.label} type="button" onClick={onClick} aria-label={s.label}
                     className="size-10 grid place-items-center rounded-full glass border border-border hover:border-primary-bright/60 hover:text-text-strong transition-all hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]">
                    <Icon size={16} />
                  </button>
                )
              })}
            </div>
            <button type="button" onClick={() => openMail({ to: personal.email })}
                    className="mt-4 inline-block text-sm text-text hover:text-primary-bright transition-colors text-left">
              {personal.email}
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <div>© {year} {personal.name}. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span className="font-mono">Built with React · Vite · Tailwind · Framer Motion</span>
            <button
              onClick={scrollTop}
              aria-label="Back to top"
              className="size-10 grid place-items-center rounded-full glass border border-border hover:border-primary-bright/60 hover:text-text-strong transition-all hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}