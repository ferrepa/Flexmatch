import { getJobById, createBewerbung } from '$lib/server/db.js';
import { error, fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
	if (!locals.user) redirect(303, '/login');

	const job = await getJobById(params.id);
	if (!job) {
		error(404, { message: `Job mit ID "${params.id}" wurde nicht gefunden.` });
	}
	return { job };
}

/** @type {import('./$types').Actions} */
export const actions = {
	bewerben: async ({ request, params }) => {
		const data = await request.formData();
		const name      = data.get('name')?.toString().trim()      ?? '';
		const email     = data.get('email')?.toString().trim()     ?? '';
		const telefon   = data.get('telefon')?.toString().trim()   ?? '';
		const nachricht = data.get('nachricht')?.toString().trim() ?? '';

		const errors = {};
		if (!name)                          errors.name      = 'Name ist erforderlich.';
		if (!email || !email.includes('@')) errors.email     = 'Bitte eine gültige E-Mail eingeben.';
		if (!telefon)                       errors.telefon   = 'Telefonnummer ist erforderlich.';
		if (!nachricht)                     errors.nachricht = 'Bitte eine kurze Nachricht schreiben.';
		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, values: { name, email, telefon, nachricht } });
		}

		const job = await getJobById(params.id);

		let persisted = false;
		try {
			const insertedId = await createBewerbung({
				jobId:    params.id,
				jobTitel: job?.title   ?? '',
				firma:    job?.company ?? '',
				name, email, telefon, nachricht
			});
			persisted = insertedId !== null;
		} catch (err) {
			console.warn('[apply] Bewerbung konnte nicht in DB gespeichert werden:', err.message);
		}

		return { success: true, persisted, bewerbung: { jobId: params.id, name, email, telefon, nachricht } };
	}
};
