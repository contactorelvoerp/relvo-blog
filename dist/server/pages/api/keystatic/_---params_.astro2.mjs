import { m as makeHandler } from '../../../chunks/keystatic-astro-api_CNH0B6Uq.mjs';
import { k as keystaticConfig } from '../../../chunks/keystatic.config_CkiIUqgj.mjs';
export { renderers } from '../../../renderers.mjs';

const ALL = makeHandler({ config: keystaticConfig });
const prerender = false;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	ALL,
	prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
