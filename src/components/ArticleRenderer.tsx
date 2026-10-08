import { DocumentRenderer } from '@keystatic/core/renderer'
import { renderToStaticMarkup } from 'react-dom/server'
import { pictureHtml } from '../lib/images'

// Cuerpo del artículo como HTML estático: los h2/h3 llevan id para el índice y las imágenes
// salen como <picture> con WebP y dimensiones (lib/images).
export function articleHtml(document: any, headingIds: string[]) {
  let idx = 0
  const html = renderToStaticMarkup(
    <DocumentRenderer
      document={document}
      renderers={{
        block: {
          heading: ({ level, children }) => {
            const Tag = `h${level}` as any
            return level === 2 || level === 3 ? <Tag id={headingIds[idx++]}>{children}</Tag> : <Tag>{children}</Tag>
          },
        },
      }}
    />,
  )
  const unescape = (s: string) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  return html.replace(/<img src="([^"]*)" alt="([^"]*)"[^>]*\/?>/g, (_, src, alt) => pictureHtml(unescape(src), unescape(alt)))
}
