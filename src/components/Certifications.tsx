import { motion } from 'framer-motion'
import { Award, ExternalLink, Image, ShieldCheck } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { certifications } from '../lib/data'
import { openExternal } from '../lib/actions'

export default function Certifications() {
  return (
    <section id="certifications" className="section relative">
      <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
      <SectionHeading
        eyebrow="Credentials"
        title="Verified Certificates"
        subtitle="Certificate proofs, credential IDs and verification links collected in one place."
      />

      <div className="mx-auto max-w-6xl grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certifications.map((c, i) => (
          <Reveal key={`${c.name}-${c.issuer}`} delay={i * 0.04}>
            <motion.article
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              className="group relative glass rounded-2xl h-full overflow-hidden"
              style={{ ['--c' as any]: c.accent }}
            >
              <button
                type="button"
                onClick={() => openExternal(c.image)}
                className="block w-full text-left"
                aria-label={`Open ${c.name} certificate image`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-bg-2">
                  <img
                    src={c.image}
                    alt={`${c.name} certificate`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg/85 to-transparent" />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/15 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-emerald-300">
                    <ShieldCheck size={11} /> Proof
                  </div>
                </div>
              </button>

              <div className="p-5">
                <div
                  className="size-11 grid place-items-center rounded-xl border border-white/10 mb-4 transition-all group-hover:shadow-[0_0_24px_var(--c)]"
                  style={{ background: `${c.accent}1A`, color: c.accent }}
                >
                  <Award size={20} />
                </div>
                <h3 className="font-display font-semibold text-base text-text-strong leading-tight">
                  {c.name}
                </h3>
                <div className="mt-1 text-[10px] font-mono uppercase tracking-widest text-muted">
                  {c.issuer}
                </div>
                <div className="mt-4 space-y-1 text-xs text-muted">
                  {c.issued && <div>Issued: <span className="text-text">{c.issued}</span></div>}
                  {c.credentialId && <div>Credential: <span className="text-text break-all">{c.credentialId}</span></div>}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => openExternal(c.image)}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-2 text-xs text-text hover:border-primary-bright/60 hover:text-primary-bright transition-colors"
                  >
                    <Image size={13} /> View Proof
                  </button>
                  {c.verifyLink && (
                    <button
                      type="button"
                      onClick={() => openExternal(c.verifyLink!)}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-2 text-xs text-text hover:border-primary-bright/60 hover:text-primary-bright transition-colors"
                    >
                      <ExternalLink size={13} /> Verify
                    </button>
                  )}
                </div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
