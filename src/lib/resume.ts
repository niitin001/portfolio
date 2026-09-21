import { personal, projects, experience, education, certifications, skills } from './data'
import { downloadBlob } from './actions'

export async function downloadResume() {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const W = doc.internal.pageSize.getWidth()
  const H = doc.internal.pageSize.getHeight()
  const M = 48
  let y = M

  // Header gradient bar
  doc.setFillColor(34, 211, 238)
  doc.rect(0, 0, W, 6, 'F')
  doc.setFillColor(59, 130, 246)
  doc.rect(0, 6, W, 2, 'F')

  // Name
  doc.setTextColor(15, 23, 42)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(26)
  doc.text(personal.name, M, y + 18)
  y += 26

  // Title
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(12)
  doc.setTextColor(34, 211, 238)
  doc.text(personal.roles[0], M, y + 14)
  y += 20

  // Contact line
  doc.setFontSize(9.5)
  doc.setTextColor(71, 85, 105)
  const contact = `${personal.email}  •  ${personal.phone}  •  ${personal.location}`
  doc.text(contact, M, y + 10)
  y += 14
  const links = `${personal.linkedin.replace('https://','')}  •  ${personal.github.replace('https://','')}`
  doc.text(links, M, y + 10)
  y += 22

  // Divider
  doc.setDrawColor(34, 211, 238)
  doc.setLineWidth(0.7)
  doc.line(M, y, W - M, y)
  y += 18

  const drawSection = (title: string) => {
    if (y > H - 80) { doc.addPage(); y = M }
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(15, 23, 42)
    doc.text(title.toUpperCase(), M, y)
    doc.setDrawColor(34, 211, 238)
    doc.setLineWidth(1.2)
    doc.line(M, y + 4, M + 40, y + 4)
    doc.setLineWidth(0.4)
    doc.setDrawColor(226, 232, 240)
    doc.line(M + 44, y + 4, W - M, y + 4)
    y += 20
  }

  const wrapText = (text: string, fontSize: number) => {
    doc.setFontSize(fontSize)
    return doc.splitTextToSize(text, W - 2 * M)
  }

  // Summary
  drawSection('Profile')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10.5)
  doc.setTextColor(51, 65, 85)
  const summary = wrapText(personal.intro, 10.5)
  doc.text(summary, M, y)
  y += summary.length * 14 + 12

  // Skills
  drawSection('Skills')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10.5)
  doc.setTextColor(51, 65, 85)
  const skillText = skills.map(s => s.name).join('  •  ')
  const skillLines = wrapText(skillText, 10.5)
  doc.text(skillLines, M, y)
  y += skillLines.length * 14 + 12

  // Projects
  drawSection('Projects')
  projects.forEach(p => {
    if (y > H - 100) { doc.addPage(); y = M }
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11.5)
    doc.setTextColor(15, 23, 42)
    doc.text(`${p.title}`, M, y)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9.5)
    doc.setTextColor(100, 116, 139)
    doc.text(`  —  ${p.github.replace('https://','')}`, M + doc.getTextWidth(p.title) + 6, y)
    y += 14
    doc.setFontSize(10)
    doc.setTextColor(51, 65, 85)
    const desc = wrapText(p.description, 10)
    doc.text(desc, M, y)
    y += desc.length * 13 + 4
    doc.setFontSize(9.5)
    doc.setTextColor(34, 211, 238)
    doc.text(`Stack: ${p.stack.join(' • ')}`, M, y)
    y += 16
  })

  // Experience
  drawSection('Experience')
  experience.forEach(e => {
    if (y > H - 80) { doc.addPage(); y = M }
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11.5)
    doc.setTextColor(15, 23, 42)
    doc.text(`${e.role} — ${e.company}`, M, y)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9.5)
    doc.setTextColor(100, 116, 139)
    doc.text(`${e.period}  •  ${e.location}`, W - M, y, { align: 'right' })
    y += 14
    doc.setFontSize(10)
    doc.setTextColor(51, 65, 85)
    e.bullets.forEach(b => {
      if (y > H - 60) { doc.addPage(); y = M }
      const lines = wrapText(`•  ${b}`, 10)
      doc.text(lines, M, y)
      y += lines.length * 13
    })
    y += 6
  })

  // Education
  drawSection('Education')
  education.forEach(ed => {
    if (y > H - 60) { doc.addPage(); y = M }
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11.5)
    doc.setTextColor(15, 23, 42)
    doc.text(ed.degree, M, y)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9.5)
    doc.setTextColor(100, 116, 139)
    doc.text(ed.period, W - M, y, { align: 'right' })
    y += 14
    doc.setFontSize(10)
    doc.setTextColor(51, 65, 85)
    doc.text(ed.school, M, y); y += 13
    doc.text(ed.detail, M, y); y += 16
  })

  // Certifications
  drawSection('Certifications')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10.5)
  doc.setTextColor(51, 65, 85)
  certifications.forEach(c => {
    if (y > H - 40) { doc.addPage(); y = M }
    doc.text(`•  ${c.name}  —  ${c.issuer}`, M, y)
    y += 14
  })

  // Footer
  const pageCount = (doc as any).internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(148, 163, 184)
    doc.text(`© 2026 ${personal.name}  •  Generated ${new Date().toLocaleDateString()}`, W / 2, H - 18, { align: 'center' })
  }

  // jsPDF's `doc.save()` navigates the top frame, which is blocked in
  // sandboxed iframes. Use a Blob + object URL instead so it works everywhere.
  const blob = doc.output('blob') as Blob
  downloadBlob(blob, `${personal.name.replace(' ', '_')}_Resume.pdf`)
}