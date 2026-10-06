import * as React from 'react';
import { ArrowUpRight, Clock, XIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

export type ProjectImageMeta = {
	src: string;
	width: number;
	height: number;
	alt: string;
};

export type ProjectPreview = {
	id: string;
	title: string;
	excerpt: string;
	date: string;
	/** Durée approximative affichée si renseignée */
	duration?: string;
	type: 'pro' | 'perso';
	stack: string[];
	cover: ProjectImageMeta;
	gallery: ProjectImageMeta[];
	detailUrl: string;
};

function TypeBadge({ type }: { type: 'pro' | 'perso' }) {
	if (type === 'pro') {
		return (
			<Badge
				className="rounded-md border-0 bg-sky-100/90 font-medium text-sky-900 hover:bg-sky-100"
				variant="secondary"
			>
				Professionnel
			</Badge>
		);
	}
	return (
		<Badge
			className="rounded-md border-0 bg-emerald-50/90 font-medium text-emerald-900 hover:bg-emerald-50"
			variant="secondary"
		>
			Personnel
		</Badge>
	);
}

export function ProjectShowcase({ projects }: { projects: ProjectPreview[] }) {
	return (
		<ul className="mx-auto grid max-w-6xl list-none grid-cols-1 gap-10 gap-y-12 md:grid-cols-2">
			{projects.map((p) => (
				<li key={p.id} className="group flex flex-col">
					<Dialog>
						<DialogTrigger asChild>
							<button
								type="button"
								className="text-left outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2"
							>
								<div className="overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-none transition-[border-color,box-shadow] duration-150 group-hover:border-zinc-300">
									<div className="aspect-[4/3] w-full overflow-hidden bg-zinc-50">
										<img
											src={p.cover.src}
											alt={p.cover.alt}
											width={p.cover.width}
											height={p.cover.height}
											className="h-full w-full object-cover"
											loading="lazy"
											decoding="async"
										/>
									</div>
									<div className="space-y-3 px-5 py-5">
										<div className="flex flex-wrap items-center gap-x-3 gap-y-1">
											<TypeBadge type={p.type} />
											<span className="text-xs text-zinc-400">
												{new Date(p.date).toLocaleDateString('fr-FR', {
													year: 'numeric',
													month: 'short',
												})}
											</span>
											{p.duration ? (
												<span className="inline-flex items-center gap-1 text-xs text-zinc-400">
													<Clock className="size-3 shrink-0 opacity-70" aria-hidden />
													{p.duration}
												</span>
											) : null}
										</div>
										<h3 className="text-lg font-medium tracking-tight text-zinc-900">
											{p.title}
										</h3>
										<p className="line-clamp-2 text-sm leading-relaxed text-zinc-500">
											{p.excerpt}
										</p>
										<ul className="flex flex-wrap gap-1.5 pt-1">
											{p.stack.map((tag) => (
												<li
													key={tag}
													className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600"
												>
													{tag}
												</li>
											))}
										</ul>
									</div>
								</div>
							</button>
						</DialogTrigger>
						<DialogContent
							showCloseButton={false}
							className="flex max-h-[min(88vh,900px)] w-full flex-col gap-0 overflow-hidden border-zinc-200 bg-white p-0 shadow-2xl max-w-[min(100vw-1.5rem,72rem)]"
						>
							{/* Image + fermeture : la croix ne recouvre pas le texte en dessous */}
							<div className="relative max-h-[min(42vh,360px)] min-h-[140px] w-full shrink-0 overflow-hidden bg-zinc-100">
								<img
									src={p.cover.src}
									alt={p.cover.alt}
									width={p.cover.width}
									height={p.cover.height}
									className="h-full w-full max-h-[min(42vh,360px)] object-contain"
								/>
								<DialogClose asChild>
									<button
										type="button"
										className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-full border border-zinc-200/80 bg-white/95 text-zinc-700 shadow-sm outline-none ring-offset-2 transition hover:bg-white hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400"
										aria-label="Fermer"
									>
										<XIcon className="size-4" />
									</button>
								</DialogClose>
							</div>

							{/* Zone texte scrollable, fond opaque pour la lisibilité */}
							<div className="min-h-0 flex-1 overflow-y-auto overscroll-contain border-t border-zinc-100 bg-white px-5 pb-6 pt-5 sm:px-6">
								<DialogHeader className="space-y-3 text-left">
									<div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
										<TypeBadge type={p.type} />
										{p.duration ? (
											<span className="inline-flex items-center gap-1 text-xs text-zinc-500">
												<Clock className="size-3.5 shrink-0 text-zinc-400" aria-hidden />
												{p.duration}
											</span>
										) : null}
									</div>
									<DialogTitle className="pr-1 text-xl font-semibold tracking-tight text-zinc-900">
										{p.title}
									</DialogTitle>
									<DialogDescription className="text-left text-[15px] leading-relaxed text-zinc-700">
										{p.excerpt}
									</DialogDescription>
								</DialogHeader>

								{p.gallery.length > 0 ? (
									<div className="mt-6 space-y-3 border-t border-zinc-100 pt-6">
										<p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
											Galerie
										</p>
										<ul className="grid list-none gap-3 sm:grid-cols-2">
											{p.gallery.map((img, i) => (
												<li
													key={`${p.id}-g-${i}`}
													className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50"
												>
													<img
														src={img.src}
														alt={img.alt}
														width={img.width}
														height={img.height}
														className="max-h-52 w-full object-contain"
														loading="lazy"
													/>
												</li>
											))}
										</ul>
									</div>
								) : null}

								<div className="mt-6">
									<Button variant="outline" className="w-full sm:w-auto" asChild>
										<a href={p.detailUrl} className="inline-flex items-center gap-2">
											Voir le détail
											<ArrowUpRight className="size-4" aria-hidden />
										</a>
									</Button>
								</div>
							</div>
						</DialogContent>
					</Dialog>
				</li>
			))}
		</ul>
	);
}
