import { redirect, fail } from '@sveltejs/kit';
import { verifyUser } from '$lib/server/db.js';

const DEMO = { email: 'demo@flexmatch.ch', password: 'demo1234', name: 'Demo Nutzer' };

function setSession(cookies, user) {
	cookies.set('flexmatch_session', JSON.stringify({ email: user.email, name: user.name }), {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 7
	});
}

/** @type {import('./$types').PageServerLoad} */
export function load({ locals }) {
	if (locals.user) redirect(303, '/jobs');
	return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString().trim().toLowerCase() ?? '';
		const password = data.get('password')?.toString() ?? '';

		if (email === DEMO.email && password === DEMO.password) {
			setSession(cookies, DEMO);
			redirect(303, '/jobs');
		}
		const user = await verifyUser(email, password);
		if (!user) return fail(400, { error: 'E-Mail oder Passwort ist falsch.', email });
		setSession(cookies, user);
		redirect(303, '/jobs');
	},
	demo: async ({ cookies }) => {
		setSession(cookies, DEMO);
		redirect(303, '/jobs');
	}
};
