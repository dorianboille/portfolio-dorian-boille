import type { APIRoute } from 'astro';

/** Autorise l’indexation. Le sitemap n’est annoncé que si `site` est connu au build. */
export const GET: APIRoute = ({ site }) => {
	const lines = ['User-agent: *', 'Allow: /'];

	if (site) {
		const sitemap = new URL(`${import.meta.env.BASE_URL}sitemap-index.xml`, site);
		lines.push(`Sitemap: ${sitemap.href}`);
	}

	return new Response(`${lines.join('\n')}\n`, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
