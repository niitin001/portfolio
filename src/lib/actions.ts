// Robust helpers that work inside sandboxed iframes where
// `window.location.href = ...` and `doc.save()` are blocked.
//
// CRITICAL rules for sandboxed iframes:
//   1. `target="_blank"` alone is BLOCKED for navigation (no opener, no
//      rel=noopener+noreferrer combo is required, AND the iframe sandbox
//      needs `allow-popups-to-escape-sandbox`).
//   2. The `download` attribute on an <a> is IGNORED when target="_blank"
//      is set — pick one or the other. For downloads: no target attr.
//   3. `mailto:` links must NOT have target="_blank" — that opens a blank
//      tab instead of the OS mail handler. Just click the anchor.
//   4. Use `rel="noopener noreferrer"` (both, space-separated) on external
//      link buttons that render with target="_blank".

export function openExternal(url: string) {
  if (!url) return
  // 1. Try window.open (works in most preview sandboxes).
  try {
    const win = window.open(url, '_blank', 'noopener,noreferrer')
    if (win) return
  } catch {
    /* fall through */
  }
  // 2. Synthesize an anchor — target=_blank + rel=noopener-noreferrer.
  try {
    const a = document.createElement('a')
    a.href = url
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    a.remove()
  } catch {
    /* last resort: copy to clipboard */
    void copyToClipboard(url)
  }
}

/**
 * Open the user's mail client. NO `target="_blank"` — that opens a blank
 * tab. The anchor must stay on the current frame so the browser delegates
 * `mailto:` to the OS mail handler.
 */
export function openMail(opts: {
  to: string
  subject?: string
  body?: string
}) {
  const params = new URLSearchParams()
  if (opts.subject) params.set('subject', opts.subject)
  if (opts.body) params.set('body', opts.body)
  const qs = params.toString()
  const href = `mailto:${opts.to}${qs ? `?${qs}` : ''}`

  const fallbackToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    void copyToClipboard(`mailto:${opts.to}${opts.subject ? `\nSubject: ${opts.subject}` : ''}`)
  }

  // 1. Direct navigation is the most reliable way to trigger the OS mail app,
  //    especially in sandboxed previews where synthetic anchor clicks can be
  //    ignored or blocked.
  try {
    window.location.href = href
    return true
  } catch {
    /* fall through */
  }

  // 2. Synthesize a plain anchor with NO target attribute so the OS mail
  //    handler is invoked in the current browsing context.
  try {
    const a = document.createElement('a')
    a.href = href
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    a.remove()
    return true
  } catch {
    /* fall through */
  }

  // 3. Last resort: feature still remains usable even if no mail app opens
  //    by scrolling the user to the contact section and copying the email.
  fallbackToContact()
  return false
}

/**
 * Download a Blob. The `download` attribute is only honored when there is
 * NO `target="_blank"` — pick one or the other. We omit target so the
 * browser triggers a real download instead of opening a new tab.
 */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  try {
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    // intentionally no a.target — keeps the download in this frame
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    a.remove()
  } finally {
    // Revoke after a tick so the download has time to start.
    setTimeout(() => URL.revokeObjectURL(url), 1500)
  }
}

/** Copy text to clipboard with a textarea fallback. */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* fall through */
  }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.left = '-9999px'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
    return true
  } catch {
    return false
  }
}