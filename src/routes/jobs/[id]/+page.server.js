import { getJobById, getAllJobs } from '$lib/server/db.js';
import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
	if (!locals.user) redirect(303, '/login');

	const job = await getJobById(params.id);
	if (!job) {
		error(404, { message: `Job mit ID "${params.id}" wurde nicht gefunden.` });
	}

	const alle = await getAllJobs();
	const similar = alle.filter((j) => j.category === job.category && j.id !== job.id).slice(0, 3);

	return { job, similar };
}
