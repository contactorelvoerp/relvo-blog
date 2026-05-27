/* Colores de categoría — en contexto claro, igual que los brand colors del landing */
export const CATEGORY_COLORS: Record<string, string> = {
  'pricing-models': '#5C6B00',
  'ai-revenue':     '#633BF2',
  'the-bill':       '#C04800',
  'room-service':   '#0A7044',
  'the-tab':        '#4A5A00',
}

export const CATEGORY_BG: Record<string, string> = {
  'pricing-models': 'rgba(208,255,11,0.12)',
  'ai-revenue':     'rgba(99,59,242,0.10)',
  'the-bill':       'rgba(255,149,102,0.14)',
  'room-service':   'rgba(114,221,170,0.14)',
  'the-tab':        'rgba(184,209,42,0.14)',
}

export const CATEGORY_LABELS: Record<string, string> = {
  'pricing-models': 'Pricing Models',
  'ai-revenue':     'AI & Revenue',
  'the-bill':       'The Bill',
  'room-service':   'Room Service',
  'the-tab':        'The Tab',
}

export function categoryColor(slug: string): string {
  return CATEGORY_COLORS[slug] ?? '#626262'
}
export function categoryBg(slug: string): string {
  return CATEGORY_BG[slug] ?? 'rgba(19,19,30,0.06)'
}
export function categoryLabel(slug: string): string {
  return CATEGORY_LABELS[slug] ?? slug
}
