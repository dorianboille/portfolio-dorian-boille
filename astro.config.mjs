// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * GitHub Pages : définir au build, par exemple
 *   PUBLIC_SITE_URL=https://username.github.io PUBLIC_BASE_PATH=/nom-du-depot/ npm run build
 * Site utilisateur (username.github.io) : PUBLIC_BASE_PATH=/
 */
const site = process.env.PUBLIC_SITE_URL?.replace(/\/$/, '');
const base = process.env.PUBLIC_BASE_PATH ?? '/';

// https://astro.build/config
export default defineConfig({
	site: site || undefined,
	base,
	trailingSlash: 'always',

	integrations: [
		react(),
		mdx(),
		...(site
			? [
					sitemap({
						filter: (page) => !page.includes('/quizzle/'),
					}),
				]
			: []),
	],

	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
			},
		},
	},

	image: {
		// Optimisation native (sharp) — déjà utilisée par getImage / <Image />
		service: {
			entrypoint: 'astro/assets/services/sharp',
		},
	},
});
