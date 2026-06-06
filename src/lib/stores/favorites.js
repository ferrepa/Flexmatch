import { browser } from '$app/environment';

const STORAGE_KEY = 'flexmatch_favoriten';

/** Alle gemerkten Jobs zurückgeben */
export function getFavoriten() {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}

/** Ist dieser Job gemerkt? */
export function isFavorit(id) {
	return getFavoriten().some((f) => f.id === id);
}

/** Job merken/entfernen (Toggle). Gibt den neuen Status zurück (true = gemerkt). */
export function toggleFavorit(job) {
	if (!browser) return false;
	const alle = getFavoriten();
	const i = alle.findIndex((f) => f.id === job.id);
	if (i >= 0) {
		alle.splice(i, 1);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(alle));
		return false;
	}
	alle.push({
		id: job.id,
		title: job.title,
		company: job.company,
		location: job.location,
		hourlyRate: job.hourlyRate,
		category: job.category,
		workload: job.workload
	});
	localStorage.setItem(STORAGE_KEY, JSON.stringify(alle));
	return true;
}

/** Einen gemerkten Job entfernen */
export function removeFavorit(id) {
	if (!browser) return;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(getFavoriten().filter((f) => f.id !== id)));
}
