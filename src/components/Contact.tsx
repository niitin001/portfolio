import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Loader2, CheckCircle2, Copy, Check, AlertCircle } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { contactEndpoint, personal } from '../lib/data'
import { openExternal, openMail, copyToClipboard } from '../lib/actions'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'copied' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    setFeedback('')

    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio contact from ${form.name}`,
          _template: 'table',
        }),
      })

      if (!response.ok) throw new Error('Message could not be submitted')
      setStatus('sent')
      setFeedback('Message sent to my inbox. I will reply soon.')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => {
        setStatus('idle')
        setFeedback('')
      }, 4500)
    } catch {
      setStatus('error')
      setFeedback('Submission service could not send this message. Please email me directly.')
    }
  }

  const onCopyEmail = async () => {
    const ok = await copyToClipboard(personal.email)
    if (ok) {
      setStatus('copied')
      setFeedback('Email copied to clipboard.')
      setTimeout(() => {
        setStatus('idle')
        setFeedback('')
      }, 2200)
    }
  }

  const items = [
    { icon: Mail,    label: 'Email',    value: personal.email,    action: () => openMail({ to: personal.email }) },
    { icon: Phone,   label: 'Phone',    value: personal.phone,    action: () => window.location.assign(`tel:${personal.phone.replace(/\s/g,'')}`) },
    { icon: MapPin,  label: 'Location', value: personal.location, action: () => openExternal(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(personal.location)}`) },
  ]

  return (
    <section id="contact" className="section">
      <SectionHeading
        eyebrow="Get in Touch"
        title="Let's Connect"
        subtitle="Have an opportunity, project or collaboration idea? Send a message directly to my inbox."
      />

      <div className="mx-auto max-w-6xl grid lg:grid-cols-5 gap-6">
        <Reveal className="lg:col-span-2">
          <div className="glass rounded-3xl p-7 h-full flex flex-col">
            <h3 className="font-display text-2xl font-semibold text-text-strong">
              Reach me directly
            </h3>
            <p className="mt-3 text-muted text-sm leading-relaxed">
              I'm open to internships, freelance web projects and collaborations on data
              dashboards or open-source ideas.
            </p>

            <div className="mt-7 space-y-4">
              {items.map((it) => {
                const Icon = it.icon
                return (
                  <button
                    type="button"
                    key={it.label}
                    onClick={it.action}
                    className="group w-full text-left flex items-center gap-4 p-3 rounded-2xl glass border border-border hover:border-primary-bright/50 hover:-translate-y-0.5 transition-all"
                  >
                    <div className="size-11 grid place-items-center rounded-xl bg-gradient-to-br from-primary-bright/20 to-accent/20 border border-border text-primary-bright">
                      <Icon size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted">
                        {it.label}
                      </div>
                      <div className="text-sm text-text-strong group-hover:text-gradient transition-colors break-all">
                        {it.value}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted group-hover:text-primary-bright transition-colors">
                      Open
                    </span>
                  </button>
                )
              })}
              <button
                type="button"
                onClick={onCopyEmail}
                className="w-full inline-flex items-center justify-center gap-2 text-xs font-mono text-muted hover:text-primary-bright transition-colors py-1"
              >
                {status === 'copied' ? <><Check size={12} /> Copied to clipboard</> : <><Copy size={12} /> Copy email address</>}
              </button>
            </div>

            <div className="mt-auto pt-7 flex items-center gap-3">
              <button type="button" onClick={() => openExternal(personal.github)} aria-label="GitHub"
                 className="size-11 grid place-items-center rounded-full glass border border-border hover:border-primary-bright/60 hover:text-text-strong transition-all hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]">
                <Github size={16} />
              </button>
              <button type="button" onClick={() => openExternal(personal.linkedin)} aria-label="LinkedIn"
                 className="size-11 grid place-items-center rounded-full glass border border-border hover:border-primary-bright/60 hover:text-text-strong transition-all hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]">
                <Linkedin size={16} />
              </button>
              <button type="button" onClick={() => openMail({ to: personal.email })} aria-label="Email"
                 className="size-11 grid place-items-center rounded-full glass border border-border hover:border-primary-bright/60 hover:text-text-strong transition-all hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]">
                <Mail size={16} />
              </button>
              <a href={`tel:${personal.phone.replace(/\s/g,'')}`} aria-label="Phone"
                 className="size-11 grid place-items-center rounded-full glass border border-border hover:border-primary-bright/60 hover:text-text-strong transition-all hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]">
                <Phone size={16} />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-3">
          <form
            onSubmit={onSubmit}
            className="glass rounded-3xl p-7 md:p-8 relative overflow-hidden"
          >
            <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary-bright/15 blur-3xl" />

            <div className="relative grid sm:grid-cols-2 gap-5">
              <Field
                label="Your Name"
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Jane Doe"
                required
              />
              <Field
                label="Your Email"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="jane@email.com"
                required
              />
            </div>
            <div className="relative mt-5">
              <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={6}
                value={form.message}
                onChange={onChange}
                required
                minLength={10}
                placeholder="Hi Nitil, I'd love to talk about..."
                className="w-full rounded-2xl bg-bg/60 border border-border focus:border-primary-bright/60 focus:ring-2 focus:ring-primary-bright/20 outline-none p-4 text-sm text-text placeholder:text-muted/60 transition-all resize-none"
              />
            </div>

            {feedback && (
              <div
                className={`relative mt-5 flex items-start gap-2 rounded-2xl border px-4 py-3 text-sm ${
                  status === 'error'
                    ? 'border-red-400/30 bg-red-400/10 text-red-200'
                    : 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
                }`}
              >
                {status === 'error' ? <AlertCircle size={16} className="mt-0.5" /> : <CheckCircle2 size={16} className="mt-0.5" />}
                <span>{feedback}</span>
              </div>
            )}

            <div className="relative mt-6 flex items-center justify-between flex-wrap gap-4">
              <div className="text-xs text-muted">
                Messages are sent to{' '}
                <button
                  type="button"
                  onClick={() => openMail({ to: personal.email })}
                  className="text-primary-bright hover:underline"
                >
                  {personal.email}
                </button>
              </div>
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileTap={{ scale: 0.97 }}
                className="btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'idle'    && (<><Send size={15} /> Send Message</>)}
                {status === 'sending' && (<><Loader2 size={15} className="animate-spin" /> Sending...</>)}
                {status === 'sent'    && (<><CheckCircle2 size={15} /> Sent!</>)}
                {status === 'copied'  && (<><CheckCircle2 size={15} /> Copied</>)}
                {status === 'error'   && (<><AlertCircle size={15} /> Try Again</>)}
              </motion.button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function Field(props: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">
        {props.label}
      </label>
      <input
        type={props.type || 'text'}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
        placeholder={props.placeholder}
        className="w-full rounded-2xl bg-bg/60 border border-border focus:border-primary-bright/60 focus:ring-2 focus:ring-primary-bright/20 outline-none p-3.5 text-sm text-text placeholder:text-muted/60 transition-all"
      />
    </div>
  )
}
