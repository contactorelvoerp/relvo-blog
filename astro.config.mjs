import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import keystatic from '@keystatic/astro'
import vercel from '@astrojs/vercel/serverless'

export default defineConfig({
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    keystatic(),
  ],
  output: 'hybrid',
  adapter: vercel({ nodeVersion: '20' }),
})
