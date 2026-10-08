import type { APIRoute } from 'astro'
import { getPosts, postPath } from '../../lib/posts'
import { BLOG_META, BLOG_PATH, absoluteUrl, paragraphs } from '../../lib/site'

export const prerender = true

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export const GET: APIRoute = async () => {
  const posts = await getPosts()
  const items = posts.map((p) => `    <item>
      <title>${esc(p.entry.title)}</title>
      <link>${absoluteUrl(postPath(p.slug))}</link>
      <guid>${absoluteUrl(postPath(p.slug))}</guid>
      <pubDate>${new Date(`${p.entry.publishedAt}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(paragraphs(p.entry.excerpt).join(' '))}</description>
    </item>`).join('\n')
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(BLOG_META.title)}</title>
    <link>${absoluteUrl(BLOG_PATH)}</link>
    <description>${esc(BLOG_META.description)}</description>
    <language>es</language>
${items}
  </channel>
</rss>
`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
