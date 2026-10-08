import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import keystatic from '@keystatic/astro'
import vercel from '@astrojs/vercel/serverless'

// El blog se publica en getrelvo.ai/blog: la landing hace rewrite de /blog y /blog/* a este
// proyecto. Por eso páginas, imágenes, fuentes y assets del build viven bajo /blog. El admin de
// Keystatic (/keystatic) se usa desde el dominio propio del proyecto, no desde getrelvo.ai.
export default defineConfig({
  site: 'https://getrelvo.ai',
  integrations: [react(), keystatic()],
  output: 'hybrid',
  build: { assets: 'blog/_astro' },
  adapter: vercel({ nodeVersion: '20' }),
})
