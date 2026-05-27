import { T as createComponent, a2 as renderHead, a7 as renderTemplate } from '../../chunks/astro/server_BTcE4Djc.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$ = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><title>Keystatic — Relvo Blog</title>${renderHead()}</head> <body> <div id="keystatic-app"></div>  </body> </html>`;
}, "C:/Users/ricar/Desktop/RELVO/relvo-blog/src/pages/keystatic/[...params].astro", void 0);

const $$file = "C:/Users/ricar/Desktop/RELVO/relvo-blog/src/pages/keystatic/[...params].astro";
const $$url = "/keystatic/[...params]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
