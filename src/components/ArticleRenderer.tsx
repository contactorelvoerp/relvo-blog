import { DocumentRenderer } from '@keystatic/core/renderer'

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function getNodeText(node: any): string {
  if (typeof node.text === 'string') return node.text
  if (node.children) return (node.children as any[]).map(getNodeText).join('')
  return ''
}

export default function ArticleRenderer({ document }: { document: any }) {
  return (
    <DocumentRenderer
      document={document}
      renderers={{
        block: {
          heading: ({ level, children }) => {
            const Tag = `h${level}` as any
            // Extract text from children to build the id
            const text = typeof children === 'string'
              ? children
              : Array.isArray(children)
                ? (children as any[]).map(c => (typeof c === 'string' ? c : c?.props?.children ?? '')).join('')
                : ''
            const id = slugify(text)
            return <Tag id={id}>{children}</Tag>
          },
        },
      }}
    />
  )
}
