import { browser } from '$app/environment';

const STORAGE_KEY = 'flexmatch_bewerbungen';

/** Gibt alle gespeicherten Bewerbungen zurück */
export function getBewerbungen() {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}

/** Speichert eine neue Bewerbung im localStorage */
export function saveBewerbung(bewerbung) {
	if (!browser) return;
	const alle = getBewerbungen();
	alle.push({
		...bewerbung,
		id: Date.now(),
		datum: new Date().toLocaleDateString('de-CH'),
		status: 'In Prüfung'
	});
	localStorage.setItem(STORAGE_KEY, JSON.stringify(alle));
}

/** Löscht eine Bewerbung anhand ihrer id */
export function deleteBewerbung(id) {
	if (!browser) return;
	const gefiltert = getBewerbungen().filter((b) => b.id !== id);
	localStorage.setItem(STORAGE_KEY, JSON.stringify(gefiltert));
}
