import Reveal from './Reveal'

type Props = {
  eyebrow: string
  title: string
  subtitle?: string
}

export default function SectionHeading({ eyebrow, title, subtitle }: Props) {
  return (
    <div className="max-w-3xl mx-auto text-center mb-14 md:mb-20">
      <Reveal>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/80 text-[10px] font-mono tracking-[0.25em] text-primary-bright uppercase mb-6 shadow-[0_0_25px_rgba(125,211,252,0.12)]">
          <span className="size-1.5 rounded-full bg-primary-bright animate-pulse" />
          {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-[-0.04em]">
          <span className="text-text-strong">{title.split(' ')[0]} </span>
          <span className="text-gradient">{title.split(' ').slice(1).join(' ') || title}</span>
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.12}>
          <p className="mt-5 text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}