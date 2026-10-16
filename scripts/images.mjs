// Imágenes del blog (portadas y las del cuerpo, que Keystatic sube a public/blog/<slug>/): genera
// una versión WebP liviana junto a cada PNG/JPG (<nombre>.opt.webp, fuera de git) y un manifiesto
// con sus dimensiones, para servir WebP con ancho y alto declarados (sin saltos de layout).
// Corre antes del build y del dev (package.json).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import crypto from 'node:crypto'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dir = path.join(root, 'public/blog')
const MAX_WIDTH = 1600

const files = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
  const full = path.join(d, e.name)
  if (e.isDirectory()) return e.name === 'fonts' || e.name === 'shell' ? [] : files(full)
  return /\.(png|jpe?g)$/i.test(e.name) ? [full] : []
})

const manifest = {}
for (const file of files(dir)) {
  const url = `/${path.relative(path.join(root, 'public'), file).split(path.sep).join('/')}`
  const webp = file.replace(/\.(png|jpe?g)$/i, '.opt.webp')
  const meta = await sharp(file).metadata()
  const width = Math.min(meta.width, MAX_WIDTH)
  const height = Math.round((meta.height * width) / meta.width)
  if (!fs.existsSync(webp) || fs.statSync(webp).mtimeMs < fs.statSync(file).mtimeMs) {
    await sharp(file).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(webp)
  }
  // Huella del contenido: Keystatic guarda la portada siempre como coverImage.<ext>, así que al
  // reemplazarla la URL no cambia y navegadores y CDN siguen mostrando la anterior. ?v= lo evita.
  const v = crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex').slice(0, 10)
  manifest[url] = { width, height, webp: url.replace(/\.(png|jpe?g)$/i, '.opt.webp'), v }
}
fs.mkdirSync(path.join(root, 'src/generated'), { recursive: true })
fs.writeFileSync(path.join(root, 'src/generated/images.json'), `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`images: ${Object.keys(manifest).length} imágenes con WebP y dimensiones`)
