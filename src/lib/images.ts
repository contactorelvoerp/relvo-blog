import manifest from '../generated/images.json'

// Imagen de public/blog como <picture>: WebP generado por scripts/images.mjs, el original de
// respaldo y ancho y alto declarados. Las que no están en el manifiesto quedan como <img> simple.
type Entry = { width: number; height: number; webp: string; v?: string }
const images = manifest as Record<string, Entry>

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const encode = (url: string) => encodeURI(decodeURI(url))

export const imageSize = (src: string) => images[decodeURI(src)] ?? null

// URL con la huella del contenido, para que un reemplazo con el mismo nombre no quede en caché.
export const versioned = (src: string) => {
  const v = imageSize(src)?.v
  return v ? `${src}?v=${v}` : src
}

export function pictureHtml(src: string, alt: string, { eager = false, className = '' } = {}) {
  const img = imageSize(src)
  const cls = className ? ` class="${className}"` : ''
  const attrs = `alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}`
  if (!img) return `<picture${cls}><img src="${esc(encode(src))}" ${attrs} /></picture>`
  return `<picture${cls}><source srcset="${esc(encode(img.webp))}${img.v ? `?v=${img.v}` : ''}" type="image/webp" /><img src="${esc(encode(src))}${img.v ? `?v=${img.v}` : ''}" width="${img.width}" height="${img.height}" ${attrs} /></picture>`
}
