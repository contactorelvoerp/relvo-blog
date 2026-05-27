import { config, collection, fields } from '@keystatic/core'

export default config({
  storage: {
    kind: 'github',
    repo: 'contactorelvoerp/relvo-blog',
  },

  ui: {
    brand: {
      name: 'The Pricing Room',
      mark: () => (
        <img src="/logo-mark-dark.svg" alt="Relvo" height={24} />
      ),
    },
  },

  collections: {
    blog: collection({
      label: 'Artículos',
      slugField: 'title',
      path: 'content/blog/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: { label: 'Título' },
          slug: { label: 'Slug (URL)' },
        }),
        publishedAt: fields.date({
          label: 'Fecha de publicación',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: 'Sección editorial',
          options: [
            { label: 'Pricing Models', value: 'pricing-models' },
            { label: 'AI & Revenue',   value: 'ai-revenue' },
            { label: 'The Bill',       value: 'the-bill' },
            { label: 'Room Service',   value: 'room-service' },
            { label: 'The Tab',        value: 'the-tab' },
          ],
          defaultValue: 'pricing-models',
        }),
        excerpt: fields.text({
          label: 'Deck / Resumen',
          description: 'Aparece bajo el título en el artículo y en las cards. Máx 200 caracteres.',
          multiline: true,
          validation: { isRequired: true, length: { max: 200 } },
        }),
        coverImage: fields.image({
          label: 'Imagen de portada',
          directory: 'public/blog',
          publicPath: '/blog/',
        }),
        author: fields.text({
          label: 'Autor',
          defaultValue: 'Equipo Relvo',
        }),
        featured: fields.checkbox({
          label: 'Destacado en portada',
          defaultValue: false,
        }),
        content: fields.document({
          label: 'Contenido',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/blog',
            publicPath: '/blog/',
          },
        }),
      },
    }),
  },
})
