import { useEffect, useState } from 'react'

type Props = {
  strings: string[]
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseMs?: number
}

export default function TypingEffect({
  strings,
  className = '',
  typingSpeed = 75,
  deletingSpeed = 40,
  pauseMs = 1400,
}: Props) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = strings[index % strings.length]
    let timer: ReturnType<typeof setTimeout>

    if (!deleting && text === current) {
      timer = setTimeout(() => setDeleting(true), pauseMs)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % strings.length)
      timer = setTimeout(() => {}, 0)
    } else {
      const delta = deleting ? -1 : 1
      const speed = deleting ? deletingSpeed : typingSpeed
      timer = setTimeout(() => {
        setText(current.slice(0, text.length + delta))
      }, speed)
    }
    return () => clearTimeout(timer)
  }, [text, deleting, index, strings, typingSpeed, deletingSpeed, pauseMs])

  return (
    <span className={`cursor ${className}`} aria-live="polite">
      {text}
    </span>
  )
}