import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks, personal } from '../lib/data'
import { openMail } from '../lib/actions'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16)
      const ids = navLinks.map((n) => n.id)
      let current = 'home'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= 120 && rect.bottom > 120) {
          current = id
          break
        }
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (id: string) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div
            className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-500 ${
              scrolled
                ? 'glass-strong shadow-[0_8px_40px_rgba(6,182,212,0.12)]'
                : 'glass'
            }`}
          >
            <button
              onClick={() => handleClick('home')}
              className="group flex items-center gap-3"
              aria-label="Home"
            >
              <span className="relative grid place-items-center size-9 rounded-xl bg-gradient-to-br from-primary-bright to-accent text-bg font-display font-bold text-lg shadow-[0_0_20px_rgba(34,211,238,0.5)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.8)] transition-shadow">
                N
                <span className="absolute inset-0 rounded-xl ring-1 ring-white/10" />
              </span>
              <span className="hidden sm:block font-display font-semibold tracking-tight text-text-strong">
                {personal.name}
              </span>
            </button>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = active === link.id
                return (
                  <button
                    key={link.id}
                    onClick={() => handleClick(link.id)}
                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive ? 'text-text-strong' : 'text-muted hover:text-text'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border border-border"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </button>
                )
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openMail({ to: personal.email })}
                className="hidden md:inline-flex btn-primary !py-2 !px-4 text-sm"
              >
                Hire Me
              </button>
              <button
                onClick={() => setOpen((o) => !o)}
                className="lg:hidden grid place-items-center size-10 rounded-xl glass border border-border text-text"
                aria-label="Menu"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-40 bg-bg/85 backdrop-blur-xl"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="pt-28 px-6"
            >
              <div className="flex flex-col gap-2 max-w-md mx-auto">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleClick(link.id)}
                    className={`text-left text-2xl font-display font-semibold py-3 border-b border-border/40 ${
                      active === link.id ? 'text-gradient' : 'text-text'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
                <button
                  type="button"
                  onClick={() => { setOpen(false); openMail({ to: personal.email, subject: 'Hiring / project enquiry', body: 'Hi Nitil,\n\nI came across your portfolio and would like to discuss a role/project opportunity.\n\nBest regards,\n[Your Name]' }) }}
                  className="mt-6 btn-primary justify-center"
                >
                  Hire Me
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => openMail({
          to: personal.email,
          subject: 'Hiring / project enquiry',
          body: 'Hi Nitil,\n\nI came across your portfolio and would like to discuss a role/project opportunity.\n\nBest regards,\n[Your Name]'
        })}
        className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 flex items-center justify-center rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-indigo-500 px-10 py-3.5 text-base font-semibold text-slate-950 shadow-[0_22px_60px_rgba(96,165,250,0.42)] ring-1 ring-white/30 transition-all hover:shadow-[0_26px_70px_rgba(96,165,250,0.52)]"
        aria-label="Hire Me"
      >
        Hire Me
      </motion.button>
    </>
  )
}