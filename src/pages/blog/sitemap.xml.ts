import type { APIRoute } from 'astro'
import { execFileSync } from 'node:child_process'
import { getPosts, postPath } from '../../lib/posts'
import { BLOG_PATH, absoluteUrl } from '../../lib/site'

export const prerender = true

// lastmod real: último commit que tocó el archivo del artículo (sin git, su fecha de publicación)
const lastmod = (file: string, fallback: string) => {
  try {
    return execFileSync('git', ['log', '-1', '--format=%cs', '--', file], { encoding: 'utf8' }).trim() || fallback
  } catch {
    return fallback
  }
}

// Sitemap del blog (la landing lo declara en su robots.txt)
export const GET: APIRoute = async () => {
  const posts = await getPosts()
  const urls = posts.map((p) => [postPath(p.slug), lastmod(`content/blog/${p.slug}.mdoc`, p.entry.publishedAt!)])
  const newest = urls.map(([, d]) => d).sort().at(-1) ?? new Date().toISOString().slice(0, 10)
  const body = [[BLOG_PATH, newest], ...urls]
    .map(([path, date]) => `  <url><loc>${absoluteUrl(path)}</loc><lastmod>${date}</lastmod></url>`)
    .join('\n')
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
