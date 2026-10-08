// Secciones editoriales (las opciones de keystatic.config.tsx)
export const CATEGORY_LABELS: Record<string, string> = {
  'pricing-models': 'Pricing Models',
  'ai-revenue': 'AI & Revenue',
  'the-bill': 'The Bill',
  'room-service': 'Room Service',
  'the-tab': 'The Tab',
}

export const categoryLabel = (slug: string) => CATEGORY_LABELS[slug] ?? slug
