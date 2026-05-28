import { DocumentRenderer } from '@keystatic/core/renderer'

export default function ArticleRenderer({ document, headingIds }: { document: any; headingIds: string[] }) {
  let idx = 0
  return (
    <DocumentRenderer
      document={document}
      renderers={{
        block: {
          heading: ({ level, children }) => {
            const Tag = `h${level}` as any
            if (level === 2 || level === 3) {
              return <Tag id={headingIds[idx++]}>{children}</Tag>
            }
            return <Tag>{children}</Tag>
          },
        },
      }}
    />
  )
}
