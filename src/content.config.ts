import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Projets du portfolio — validation stricte (Zod) pour le frontmatter MD/MDX.
 */
const projets = defineCollection({
	loader: glob({ base: './src/content/projets', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string().min(1, 'title requis'),
			date: z.coerce.date(),
			/** pro = Professionnel (badge bleu), perso = Personnel (badge gris/vert doux) */
			type: z.enum(['pro', 'perso']),
			stack: z.array(z.string().min(1)).min(1, 'au moins un élément de stack'),
			cover: image(),
			/** Texte alternatif de la cover — obligatoire, l’image porte le projet */
			coverAlt: z.string().min(1, 'coverAlt requis'),
			/** Visuels supplémentaires, distincts de la cover */
			gallery: z
				.array(
					z.object({
						image: image(),
						alt: z.string().min(1, 'alt de galerie requis'),
					}),
				)
				.default([]),
			/** Texte court pour cartes + en-tête de modale */
			excerpt: z.string().min(1, 'excerpt requis'),
			/** Ordre d’affichage sur l’accueil (1 = en premier) */
			order: z.number().int().positive(),
			/**
			 * `false` masque le projet du site en production (accueil, page détail, sitemap).
			 * Il reste visible avec `npm run dev`.
			 */
			published: z.boolean().default(true),
			/** Durée indicative (ex. « ~ 2 mois », « 3 semaines », « 40 h ») */
			duration: z.string().min(1).optional(),
		}),
});

export const collections = { projets };
