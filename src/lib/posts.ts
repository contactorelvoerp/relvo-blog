import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../keystatic.config'

const reader = createReader(process.cwd(), keystaticConfig)

// Artículos con fecha, del más nuevo al más antiguo
export async function getPosts() {
  const all = await reader.collections.blog.all()
  return all
    .filter((p) => p.entry.publishedAt)
    .sort((a, b) => b.entry.publishedAt!.localeCompare(a.entry.publishedAt!))
}

export const readPost = (slug: string) => reader.collections.blog.read(slug)
export const postPath = (slug: string) => `/blog/${slug}`
