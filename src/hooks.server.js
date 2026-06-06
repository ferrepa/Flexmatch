/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const raw = event.cookies.get('flexmatch_session');
	try {
		event.locals.user = raw ? JSON.parse(raw) : null;
	} catch {
		event.locals.user = null;
	}
	return resolve(event);
}
