// Comportamiento del nav copiado de la landing (src/shell/header.html): mismos menús que el
// componente Nav de relvo-landing. Hover con mouse abre, clic alterna, Escape y salir del nav cierran.
const nav = document.querySelector<HTMLElement>('.nav')
if (nav) {
  const PANELS: Record<string, string> = {
    product: '.nav__panel--product',
    solutions: '.nav__panel--solutions',
    resources: '.nav__dropdown',
    mobile: '.nav__sheet',
  }
  const triggers = [...nav.querySelectorAll<HTMLButtonElement>('[data-menu]')]
  let open: string | null = null
  let hovered: string | null = null

  const render = () => {
    for (const t of triggers) t.setAttribute('aria-expanded', String(t.dataset.menu === open))
    for (const [menu, sel] of Object.entries(PANELS)) nav.querySelector<HTMLElement>(sel)?.toggleAttribute('hidden', menu !== open)
    nav.classList.toggle('nav--open', Boolean(open) && open !== 'mobile')
    nav.classList.toggle('nav--mega', open === 'product' || open === 'solutions')
  }
  const set = (menu: string | null) => { open = menu; render() }

  for (const t of triggers) {
    const menu = t.dataset.menu!
    t.addEventListener('click', () => set(open === menu && hovered !== menu ? null : menu))
    if (menu === 'mobile') continue
    t.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse') return
      hovered = menu
      set(menu)
    })
  }
  for (const a of nav.querySelectorAll<HTMLAnchorElement>('.nav__links > a.nav__link')) {
    a.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { hovered = null; set(null) } })
  }
  nav.addEventListener('pointerleave', () => {
    hovered = null
    if (open !== 'mobile') set(null)
  })
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) set(null) })
}
