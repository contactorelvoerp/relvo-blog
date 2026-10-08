// Dominio, metadata y datos estructurados del blog. El blog se publica en getrelvo.ai/blog (la
// landing lo sirve con un rewrite a este proyecto), así que todas las URLs canónicas son de ese host.
export const SITE_URL = 'https://getrelvo.ai'
export const SITE_NAME = 'Relvo'
export const LINKEDIN_URL = 'https://www.linkedin.com/company/relvoerp/'
export const BLOG_PATH = '/blog'

// Title y description de /blog (relvo-landing/reference/seo-metadata.json, página "blog")
export const BLOG_META = {
  title: 'Blog de Relvo: pricing, facturación y métricas SaaS',
  description: 'Guías sobre pricing, facturación, cobranza y métricas para empresas SaaS e IA en LatAm.',
}

// Producción indexable; previews de Vercel y local con noindex
export const PRODUCTION = process.env.VERCEL_ENV === 'production'

export const absoluteUrl = (path: string) => `${SITE_URL}${path}`

const ORG_ID = `${SITE_URL}/#organization`
export const baseGraph = () => [
  { '@type': 'Organization', '@id': ORG_ID, name: SITE_NAME, url: `${SITE_URL}/`, logo: `${SITE_URL}/logo-logotype-dark.svg`, sameAs: [LINKEDIN_URL] },
  { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: SITE_NAME, url: `${SITE_URL}/`, inLanguage: 'es', publisher: { '@id': ORG_ID } },
]
export const orgRef = { '@id': ORG_ID }

export const breadcrumb = (items: [string, string][]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: absoluteUrl(path) })),
})

export const formatDate = (d: string) =>
  new Date(`${d}T12:00:00`).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })

// El resumen puede traer párrafos separados por una línea en blanco
export const paragraphs = (s: string) => s.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
