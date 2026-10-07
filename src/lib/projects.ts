import { getCollection, type CollectionEntry } from 'astro:content';

export type ProjetEntry = CollectionEntry<'projets'>;

/**
 * En développement, tous les projets sont visibles.
 * Au build de production, `published: false` les retire du site.
 */
export function isProjectVisible(published: boolean): boolean {
	return import.meta.env.DEV || published;
}

export async function getVisibleProjects(): Promise<ProjetEntry[]> {
	const entries = await getCollection('projets');
	return entries.filter((entry) => isProjectVisible(entry.data.published));
}
