// Copia el "shell" de la landing (getrelvo.ai) al blog para que ambos se vean y naveguen igual:
// nav, CTA final, footer y analytics desde el HTML publicado, y tokens, estilos, fuentes y logos
// desde el repo de la landing. Correr cada vez que cambie el nav, el footer o el design system:
//   node scripts/sync-shell.mjs [sitio] [repo de la landing]
//   (por defecto: https://getrelvo.ai y ../relvo-landing)
// Escribe src/shell/*.html, src/styles/landing/*.css, public/blog/fonts y public/blog/shell.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const site = (process.argv[2] ?? 'https://getrelvo.ai').replace(/\/$/, '')
const landing = path.resolve(root, process.argv[3] ?? '../relvo-landing')
if (!fs.existsSync(path.join(landing, 'src/styles/tokens.css'))) throw new Error(`No encuentro la landing en ${landing}`)

const html = await (await fetch(`${site}/`)).text()
const pick = (re, name) => {
  const m = html.match(re)
  if (!m) throw new Error(`No encuentro ${name} en ${site}/`)
  return m[0]
}

// Assets que referencia el shell: se copian a public/blog/shell para que el blog no dependa de la landing
const assets = new Set()
const localize = (s) => s.replace(/src="\/([^"]+)"/g, (_, p) => {
  assets.add(p)
  return `src="/blog/shell/${path.basename(p)}"`
})

// Los botones del menú reciben data-menu para que scripts/nav del blog sepa qué panel abre cada uno
let header = localize(pick(/<header class="nav[\s\S]*?<\/header>/, 'el nav'))
const order = ['product', 'solutions']
header = header
  .replace(/<div class="nav__dropdown-anchor"><button type="button" class="nav__link"/g, '<div class="nav__dropdown-anchor"><button type="button" data-menu="resources" class="nav__link"')
  .replace(/<button type="button" class="nav__link"/g, () => `<button type="button" data-menu="${order.shift()}" class="nav__link"`)
  .replace(/<button type="button" class="nav__burger"/, '<button type="button" data-menu="mobile" class="nav__burger"')

// CTA final sin la textura animada (el canvas lo dibuja el JS de la landing)
const cta = pick(/<section class="section section--cta[\s\S]*?<\/section>/, 'el CTA')
  .replace(/<div class="texture[^"]*" aria-hidden="true"><canvas><\/canvas><\/div>/, '')
const footer = localize(pick(/<footer class="footer[\s\S]*?<\/footer>/, 'el footer'))
// Analytics solo está en el HTML de producción: con un preview o un build local se conserva el actual
const analytics = html.match(/<script>window\.dataLayer[\s\S]*?<\/script>/)?.[0]
  ?? fs.readFileSync(path.join(root, 'src/shell/analytics.html'), 'utf8').trim()

const out = (p, s) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s) }
for (const [name, s] of Object.entries({ header, cta, footer, analytics })) out(path.join(root, `src/shell/${name}.html`), `${s}\n`)

// Estilos: copia literal, con las fuentes bajo /blog/fonts y sin Fujiwara (solo el H1 de la home)
for (const file of ['tokens.css', 'site.css', 'blocks.css']) {
  const css = fs.readFileSync(path.join(landing, 'src/styles', file), 'utf8')
    .split(/\r?\n/).filter((l) => !l.includes("font-family:'Fujiwara A';src")).join('\n')
    .replaceAll("url('/fonts/", "url('/blog/fonts/")
  out(path.join(root, 'src/styles/landing', file), `/* Copiado de relvo-landing/src/styles/${file} por scripts/sync-shell.mjs. No editar a mano. */\n${css}`)
}
for (const w of ['Regular', 'Medium', 'SemiBold', 'Bold']) {
  const f = `fonts/instrument-sans/InstrumentSans-${w}.woff2`
  out(path.join(root, 'public/blog', f), fs.readFileSync(path.join(landing, 'public', f)))
}
for (const p of [...assets, 'logo-mark-dark.svg', 'logo-mark-light.svg']) {
  out(path.join(root, 'public/blog/shell', path.basename(p)), fs.readFileSync(path.join(landing, 'public', p)))
}
console.log(`sync-shell: nav, CTA, footer y analytics de ${site}; estilos, fuentes y ${assets.size + 2} logos de ${landing}`)
