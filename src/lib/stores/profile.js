import { browser } from '$app/environment';

const STORAGE_KEY = 'flexmatch_profil';
const DEFAULT = { ueberMich: '', cvName: '', telefon: '', ort: '' };

/** Profildaten aus localStorage lesen */
export function getProfil() {
	if (!browser) return { ...DEFAULT };
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? { ...DEFAULT, ...JSON.parse(raw) } : { ...DEFAULT };
	} catch {
		return { ...DEFAULT };
	}
}

/** Profildaten speichern */
export function saveProfil(p) {
	if (!browser) return;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}
