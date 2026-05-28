// Patches Keystatic 0.5.x to handle inline image nodes that the CMS
// validation throws on. Without this, adding images in the document
// editor fails with "Field validation failed: Unknown inline node type: image".
const fs = require('fs')
const path = require('path')

const bundles = [
  'node_modules/@keystatic/core/dist/index-a8452c26.js',
  'node_modules/@keystatic/core/dist/index-360e5820.node.js',
  'node_modules/@keystatic/core/dist/index-382895ba.worker.js',
]

const OLD = `throw new Error(\`Unknown inline node type: \${node.type}\`)`
const NEW = `if (node.type === 'image') return []; throw new Error(\`Unknown inline node type: \${node.type}\`)`

const OLD_ALT = "throw new Error('Unknown inline node type: ' + node.type)"
const NEW_ALT = "if (node.type === 'image') return []; throw new Error('Unknown inline node type: ' + node.type)"

let patched = 0
for (const rel of bundles) {
  const file = path.join(__dirname, '..', rel)
  if (!fs.existsSync(file)) { console.log('SKIP (not found):', rel); continue }
  let src = fs.readFileSync(file, 'utf8')
  if (src.includes("if (node.type === 'image') return []")) {
    console.log('already patched:', rel); continue
  }
  if (src.includes(OLD)) {
    src = src.replace(OLD, NEW)
  } else if (src.includes(OLD_ALT)) {
    src = src.replace(OLD_ALT, NEW_ALT)
  } else {
    console.log('SKIP (pattern not found):', rel); continue
  }
  fs.writeFileSync(file, src)
  console.log('patched:', rel)
  patched++
}
console.log('Done. Patched', patched, 'file(s).')
