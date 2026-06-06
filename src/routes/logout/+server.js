import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export function GET({ cookies }) {
	cookies.delete('flexmatch_session', { path: '/' });
	redirect(303, '/login');
}
