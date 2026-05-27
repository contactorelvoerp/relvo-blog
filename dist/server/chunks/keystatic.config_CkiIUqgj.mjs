import { jsx } from 'react/jsx-runtime';
import { config, collection, fields } from '@keystatic/core';

const keystaticConfig = config({
  storage: {
    kind: "local"
    // Cambiar a 'github' al deployar:
    // kind: 'github',
    // repo: 'contactorelvoerp/relvo-blog',
  },
  ui: {
    brand: {
      name: "Relvo Blog",
      mark: () => /* @__PURE__ */ jsx("img", { src: "/logo-mark-dark.svg", alt: "Relvo", height: 24 })
    }
  },
  collections: {
    blog: collection({
      label: "Artículos",
      slugField: "title",
      path: "content/blog/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: { label: "Título" },
          slug: { label: "Slug (URL)" }
        }),
        publishedAt: fields.date({
          label: "Fecha de publicación",
          defaultValue: { kind: "today" },
          validation: { isRequired: true }
        }),
        category: fields.select({
          label: "Categoría",
          options: [
            { label: "Revenue Ops", value: "revenue-ops" },
            { label: "Facturación", value: "facturacion" },
            { label: "Contratos", value: "contratos" },
            { label: "Cobros", value: "cobros" },
            { label: "Producto", value: "producto" }
          ],
          defaultValue: "revenue-ops"
        }),
        excerpt: fields.text({
          label: "Resumen",
          description: "Aparece en la lista del blog y en el meta description.",
          multiline: true,
          validation: { isRequired: true, length: { max: 200 } }
        }),
        coverImage: fields.image({
          label: "Imagen de portada",
          directory: "public/blog",
          publicPath: "/blog/"
        }),
        author: fields.text({
          label: "Autor",
          defaultValue: "Equipo Relvo"
        }),
        featured: fields.checkbox({
          label: "Destacado en portada",
          defaultValue: false
        }),
        content: fields.mdx({
          label: "Contenido",
          options: {
            image: {
              directory: "public/blog",
              publicPath: "/blog/"
            }
          }
        })
      }
    })
  }
});

export { keystaticConfig as k };
