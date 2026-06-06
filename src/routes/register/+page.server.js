import { redirect, fail } from '@sveltejs/kit';
import { createUser } from '$lib/server/db.js';

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
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const name = data.get('name')?.toString().trim() ?? '';
		const email = data.get('email')?.toString().trim().toLowerCase() ?? '';
		const password = data.get('password')?.toString() ?? '';

		const errors = {};
		if (!name) errors.name = 'Name ist erforderlich.';
		if (!email || !email.includes('@')) errors.email = 'Bitte eine gültige E-Mail eingeben.';
		if (!password || password.length < 6) errors.password = 'Passwort: mindestens 6 Zeichen.';
		if (Object.keys(errors).length > 0) return fail(400, { errors, values: { name, email } });

		try {
			const res = await createUser({ name, email, password });
			if (!res.ok) return fail(400, { errors: { email: res.error }, values: { name, email } });
		} catch (e) {
			return fail(500, {
				errors: { email: 'Registrierung momentan nicht möglich. Nutze den Demo-Login.' },
				values: { name, email }
			});
		}

		setSession(cookies, { email, name });
		redirect(303, '/jobs');
	}
};
